const db = require('../utils/database');

// 신고 기능
module.exports = class Report {
    constructor(id, user_id, post_id) {
        (this.id = id), (this.user_id = user_id), (this.post_id = post_id);
    }

    save() {
        return db.execute('INSERT INTO report (user_id,post_id) VALUES (?,?)', [this.user_id, this.post_id]);
    }
};
