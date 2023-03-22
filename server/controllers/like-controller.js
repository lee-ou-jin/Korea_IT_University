const HttpError = require('../models/http-error');
const Like = require('../models/like');

// 좋아요 버튼을 눌렀을 때 DB에 저장
exports.saveLike = async (req, res, next) => {
    const user_id = req.userData.userId;
    const post_id = req.params.pid;
    const findUser = await Like.findUser(user_id, post_id);

    if (findUser[0].length > 0) {
        Like.deleteLike(user_id, post_id);
        return res.status(200).json({
            message: '좋아요 삭제 성공',
        });
    } else {
        const addLike = new Like(null, user_id, post_id);

        try {
            await addLike.save();
        } catch (err) {
            const error = new HttpError('좋아요 저장 실패', 500);
            return next(error);
        }

        res.status(200).json({
            message: '좋아요 저장 성공',
        });
    }
};

// 내가 좋아요 한 글
// exports.myLikeList = async (req, res, next) => {
//     let likeList;
//     const user_id = req.userData.userId;
//     try {
//         [likeList] = await Like.myLikeList(user_id);
//     } catch (err) {
//         const error = new HttpError('글을 불러오지 못했습니다.', 500);
//         return next(error);
//     }
//     res.status(200).json(likeList);
// };
