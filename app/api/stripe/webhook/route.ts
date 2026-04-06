import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.user_id
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string

    if (userId) {
      await supabaseAdmin.from('subscribers').upsert({
        id: userId,
        email: session.customer_email,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        status: 'active',
      }, { onConflict: 'id' })
    }
  }

  if (
    event.type === 'customer.subscription.deleted' ||
    event.type === 'customer.subscription.paused'
  ) {
    const subscription = event.data.object
    await supabaseAdmin
      .from('subscribers')
      .update({ status: 'inactive' })
      .eq('stripe_subscription_id', subscription.id)
  }

  return NextResponse.json({ received: true })
}