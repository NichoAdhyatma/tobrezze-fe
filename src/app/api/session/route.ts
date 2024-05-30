
import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);

      res.status(200).json({
        status: session.status,
        customer_email: session.customer_details?.email,
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
