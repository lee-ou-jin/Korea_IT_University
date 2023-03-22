// 쪽지기능

const db = require('../utils/database');

module.exports = class Note {
    constructor(send_user_id, receive_user_id, content) {
        (this.send_user_id = send_user_id), (this.receive_user_id = receive_user_id), (this.content = content);
    }

    // 쪽지 보내기를 누르는 순간 DB에는 데이터 2개 추가됨 (발송인, 수신인)
    async save() {
        await db.execute('INSERT INTO note_content (content) VALUE (?)', [this.content]);
        await db.execute('SET @last_content_id = (SELECT id FROM note_content ORDER BY id DESC LIMIT 1)');
        try {
            await db.execute('INSERT INTO note (note_type,note_content_id, user_id) VALUES (?,@last_content_id,?)', [0, this.send_user_id]);
            return db.execute('INSERT INTO note (note_type,note_content_id, user_id) VALUES (?,@last_content_id,?)', [1, this.receive_user_id]);
        } catch (err) {
            return err;
        }
    }

    // 내가 보낸 쪽지 리스트
    static sendNoteList(user_id) {
        return db.execute('SELECT note_content.id,content,send_date,note_read_type FROM note JOIN note_content ON note.note_type = 0 AND note.user_id = ? AND note_content.id = note.note_content_id', [
            user_id,
        ]);
    }

    // 내가 받은 쪽지 리스트
    static receiveNoteList(user_id) {
        return db.execute(
            'SELECT note_content.id,content,send_date,note_read_type, user.nickname FROM note JOIN note_content ON note.note_type = 1 AND note.user_id = ? AND note_content.id = note.note_content_id JOIN user ON note.user_id = user.id',
            [user_id]
        );
    }

    // 쪽지 읽음으로 변경
    static read(note_id) {
        return db.execute("UPDATE note SET note_read_type = 'Y' WHERE note_content_id = ?", [note_id]);
    }

    // note_id에 해당하는 글 상세보기
    static fetchOne(note_id) {
        return db.execute(
            'SELECT note_content.id as id , send_date,note_type,note_read_type,content,user.nickname FROM note JOIN note_content ON note_content_id = note_content.id JOIN user ON user.id = note.user_id WHERE note.id = ?',
            [note_id]
        );
    }
};
