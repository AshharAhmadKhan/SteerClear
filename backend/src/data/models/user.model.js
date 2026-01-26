// User Model
// Defines the User entity structure and validation

export class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password_hash = data.password_hash;
        this.subscription_tier = data.subscription_tier || 'trial';
        this.trial_end_date = data.trial_end_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    // Check if user's trial has expired
    isTrialExpired() {
        if (this.subscription_tier !== 'trial') {
            return false;
        }
        return new Date() > new Date(this.trial_end_date);
    }

    // Check if user has premium access
    hasPremiumAccess() {
        return this.subscription_tier === 'premium' && !this.isTrialExpired();
    }

    // Convert to safe JSON (no password hash)
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            subscription_tier: this.subscription_tier,
            trial_end_date: this.trial_end_date,
            created_at: this.created_at,
        };
    }
}