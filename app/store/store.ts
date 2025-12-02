import { Store } from "@tanstack/store";

interface SubscriptionVerification {
  haveSubscription: boolean;
}

export const subscription = new Store<SubscriptionVerification>({
  haveSubscription: false,
});
export const giveSubscription = subscription.setState((state) => ({
  haveSubscription: true,
}));

export const tookSubscription = subscription.setState((state) => ({
  haveSubscription: false,
}));
