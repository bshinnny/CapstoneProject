import './ThankYou.css';
import Logo from '../../../images/yellow-arrow.png';
import Package from '../../../images/pngegg.png';

function ThankYou() {
    let delivery = new Date();
    delivery.setDate(delivery.getDate() + 2);
    const dateStr = delivery.toDateString();

    return (
        <div className='thank-you-cont'>
            <div className='ty-header-div'>
                <h1 className='ty-heading-1'>We would like to thank you for shopping with</h1>
                <img className='logo' alt='branazon-logo' src={Logo}></img>
                <h1 className='ty-heading'>Branazon.</h1>
            </div>
            <h2>{`Please enjoy our 2 day delivery by ${dateStr} provided by Branazon Prime!`}</h2>
            <img className='ty-package' alt='package-logo' src={Package}></img>
        </div>
    )
}

export default ThankYou;
