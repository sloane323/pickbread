
const PointModal = (props) => {
  const handelClosePage =()=>{
    props.modalHandler1()
  }
    return ( 
    <div>
          <section>
            <header>
            고객 확인 - 사용가능 포인트 확인 <br />
            <input type='number' /> <button> 적용 </button>
            </header>
          </section>
      </div>
    );
}
 
export default PointModal;