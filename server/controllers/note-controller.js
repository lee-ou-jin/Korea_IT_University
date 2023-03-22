const HttpError = require('../models/http-error');

const Note = require('../models/note');

exports.sendNote = async (req, res, next) => {
    const send_user_id = req.userData.userId;
    const receive_user_id = req.body.id;
    const content = req.body.content;

    const result = new Note(send_user_id, receive_user_id, content);

    try {
        await result.save();
    } catch (err) {
        const error = new HttpError('쪽지 저장 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '쪽지 저장 성공',
    });
};

// 내가 보낸 쪽지
exports.sendNoteList = async (req, res, next) => {
    let noteList;
    try {
        [noteList] = await Note.sendNoteList(req.userData.userId);
    } catch (err) {
        const error = new HttpError('보낸 쪽지 불러오기 실패', 500);
        return next(error);
    }
    res.status(200).json(noteList);
};

// 내가 받은 쪽지
exports.receiveNoteList = async (req, res, next) => {
    let noteList;
    try {
        [noteList] = await Note.receiveNoteList(req.userData.userId);
    } catch (err) {
        const error = new HttpError('받은 쪽지 불러오기 실패', 500);
        return next(error);
    }
    res.status(200).json(noteList);
};

// id에 해당하는 쪽지 보기
exports.getNote = async (req, res, next) => {
    let noteOne;
    const note_id = req.params.nid;
    try {
        [noteOne] = await Note.fetchOne(note_id);
    } catch (err) {
        const error = new HttpError('글을 불러오지 못했습니다.', 500);
        return next(error);
    }
    res.status(200).json(noteOne);
};

// 쪽지를 읽었을 때 읽음으로 변경 - 수신인이 쪽지를 클릭했을 때 실행됨
exports.readNote = async (req, res, next) => {
    const note_id = req.params.nid;
    try {
        await Note.read(note_id);
    } catch (err) {
        const error = new HttpError('쪽지 읽음 변경 실패', 500);
        return next(error);
    }
    res.status(200).json({
        message: '쪽지 읽음 표시 성공',
    });
};
