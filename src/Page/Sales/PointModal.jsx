
const PointModal = (props) => {
  const handelClosePage =()=>{
    props.modalHandler1()
  }
    return ( 
    <div>
          <section>
            <header>
            포인트모달
            </header>
            <button className="close" onClick={handelClosePage}>
              X
            </button>
          </section>
      </div>
    );
}
 
export default PointModal;