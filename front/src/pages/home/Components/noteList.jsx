import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../../css/home.css';
import { Link } from 'react-router-dom';

function NoteList({ value }) {
    const data = value.read();
    return (
        <div style={{ margin: '0 auto', display: 'block', width: '360px', textAlign: 'center' }}>
            {data.length
                ? data.map((v) => (
                      <div key={v.id}>
                          <div className="list">
                              <Link style={{ textDecoration: 'none', color: 'black' }} to={'/note/' + v.id}>
                                  <div>
                                      <br />
                                      <h4 style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                          <FontAwesomeIcon icon="user" />
                                          {v.nickname}
                                      </h4>
                                      <p>{v.note_read_type === 'Y' ? '읽음' : '읽지않음'}</p>
                                  </div>

                                  <div>
                                      <div style={{ fontSize: '20px' }}>
                                          {' '}
                                          내용: {v.content.substr(0, 5)}... {/* 내용 축약 시켜서 내보내기 */}
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      </div>
                  ))
                : '쪽지가 없습니다.'}
        </div>
    );
}

export default NoteList;

/*홈 페이지에 있는 리스트 형태의 글을 컴포넌트로 다시 수정 할예정*/
