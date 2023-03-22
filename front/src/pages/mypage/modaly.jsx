import { React, Component} from 'react';
import "../css/modal.css"

export default class Modaly extends Component {
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = this.props;

    const handlelogOUt = () => {
      localStorage.removeItem("token");
      close();
    };
    //기능활성화 완료
    

    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>


            <main style={{fontWeight:"bold"}}>{this.props.children}
            로그아웃 하시겠습니까?
            </main>
            
            
            <footer>
            <button style={{marginRight:"10px", backgroundColor:"skyblue", fontWeight:"bold"}} className="close" onClick={handlelogOUt}>
               로그아웃
              </button>
              <button style={{backgroundColor:"pink", fontWeight:"bold"}} className="close" onClick={close}>
                취소
              </button>
              </footer>


          </section>
        ) : null}
      </div>
    );
  }
}