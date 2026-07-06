import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

// Initialize Stripe with your Secret Key securely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Read form input tokens passed from the client action
    const formData = await request.formData();
    const proposalId = formData.get("proposal_id");
    const taskId = formData.get("task_id");
    const taskTitle =
      formData.get("task_title") || "Freelancer Project Milestone";
    const amount = formData.get("amount");
    const freelancerEmail = formData.get("freelancer_email");
    const clientEmail = formData.get("client_email");

    if (!taskId || !proposalId || !amount) {
      return NextResponse.json(
        { error: "Missing essential transaction metadata tokens." },
        { status: 400 }
      );
    }

    // Convert amount payload securely to cents for Stripe processing
    const unitAmountCents = Math.round(parseFloat(amount) * 100);

    // Create a dynamic, one-time payment Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: clientEmail,
      submit_type: "pay",
      mode: "payment", // 👈 Changed from subscription to standard one-time payment
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: taskTitle,
              description: `Project execution allocation for ${freelancerEmail}`,
            },
            unit_amount: unitAmountCents,
          },
          quantity: 1,
        },
      ],
      // Store critical metadata parameters to reconstruct ledger saves post-payment
      metadata: {
        proposalId,
        taskId,
        taskTitle,
        amount,
        freelancerEmail,
        clientEmail,
      },
      success_url: `${origin}/payment/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client/manageProposals`,
    });

    // Cleanly redirect client outward to secure Stripe hosting layout pages
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe Session Generation Crash:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
