import React from 'react';
import '../../css/home.css';

function NoteDetail({ value }) {
    const data = value.read();

    return (
        <>
            {data.map((v) => (
                <div key={v.id}>
                    <div>
                        {/*유저 프로필과 닉네임 글작성 div */}
                        <h2>[유저 프로필]{v.nickname}</h2>
                        <p>{v.note_read_type === 'Y' ? '읽음' : '읽지않음'}</p>

                        {new Date(v.send_date).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'long', timeStyle: 'short' })}
                    </div>

                    <br />
                    <div>
                        {' '}
                        {/* 글내용 div */}
                        {v.content}
                    </div>
                </div>
            ))}
        </>
    );
}

export default NoteDetail;
