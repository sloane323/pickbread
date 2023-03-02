import PaymentMain from "./Payment/PaymentMain";

const PaymentMode = (props) => {
    const { open, close ,salesLog ,selectedProduct} = props;

    return ( <div> 
        <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header> <PaymentMain salesLog={salesLog} selectedProduct={selectedProduct}/>  </header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default PaymentMode;