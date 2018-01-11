// Angular and Third Party Modules, Libs etc
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Constants 
import { AppConstant } from '../../constant/app.constant';
import { ValueConstant } from '../../constant/value.constant';

export class SubscriptionBase implements OnDestroy {
    protected subscriptions: Subscription[];

    constructor() {
        this.subscriptions = [];
    }

    ngOnDestroy() {
        this.clearSubscriptions();
    }

    protected clearSubscriptions(runAfterSeconds: number = AppConstant.SUBSCRIPTION.CLEAR_TIME.DEFAULT) {
        if (runAfterSeconds > AppConstant.SUBSCRIPTION.CLEAR_TIME.DEFAULT) {
            setTimeout(() => {
                this.clearSubscriptions();
            }, runAfterSeconds);
        }
        else {
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }

    protected clearSubscription(subscription: Subscription, runAfterSeconds: number = AppConstant.SUBSCRIPTION.CLEAR_TIME.DEFAULT) {
        if (runAfterSeconds > AppConstant.SUBSCRIPTION.CLEAR_TIME.DEFAULT) {
            setTimeout(() => {
                this.clearSubscriptions();
            }, runAfterSeconds);
        }
        else {
            let index = this.subscriptions.indexOf(subscription);
            subscription.unsubscribe();
            if (index > ValueConstant.ARRAY_ITEM_NOT_FOUND_INDEX) {
                let numberOfSubscriptionsToRemove = 1;
                this.subscriptions.splice(index, numberOfSubscriptionsToRemove);
            }
        }
    }
}