// Roadmap Model
// Defines the Roadmap entity structure

export class Roadmap {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.exam_type = data.exam_type;
        this.target_date = data.target_date;
        this.daily_hours = data.daily_hours;
        this.level = data.level;
        this.generated_at = data.generated_at;
    }

    // Convert to JSON for API responses
    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            exam_type: this.exam_type,
            target_date: this.target_date,
            daily_hours: this.daily_hours,
            level: this.level,
            generated_at: this.generated_at,
        };
    }
}