export class Profile {
    constructor(data) {
        this.bio = data.bio || ''
        this.class = data.class || ''
        this.coverImg = data.coverImg || ''
        this.createdAt = data.createdAt
        this.email = data.email || ''
        this.github = data.github || ''
        this.graduated = data.graduated || false
        this.id = data.id || data._id
        this.linkedin = data.linkedin || ''
        this.name = data.name
        this.picture = data.picture || ''
        this.resume = data.resume || ''
        this.subs = data.subs || []
        this.updatedAt = data.updatedAt
    }
}