import PaymentMain from "./Payment/PaymentMain";

const PaymentMode = (props) => {
    const { open, close } = props;

    return ( <div> 
        <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header> <PaymentMain />  </header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default PaymentMode;