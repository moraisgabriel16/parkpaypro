import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({
    plate: '',
    entryTime: '',
    exitTime: '',
    amountDue: '',
  });

  const openModal = () => {
    // Placeholder data, this would come from a backend API
    setVehicleInfo({
      plate: 'ABC-1234',
      entryTime: '2024-05-22 08:30',
      exitTime: '2024-05-22 10:30',
      amountDue: 'R$ 20,00',
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openPaymentModal = () => {
    setModalIsOpen(false);
    setPaymentModalIsOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ParkPayPro</h1>
        <SearchBar openModal={openModal} />
        <VehicleInfoModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          vehicleInfo={vehicleInfo}
          handlePaymentChange={handlePaymentChange}
          openPaymentModal={openPaymentModal}
        />
        <PaymentModal
          isOpen={paymentModalIsOpen}
          onRequestClose={closePaymentModal}
          paymentMethod={paymentMethod}
          vehicleInfo={vehicleInfo}
        />
      </header>
    </div>
  );
}

const SearchBar = ({ openModal }) => (
  <div className="search-container">
    <input type="text" placeholder="Buscar..." className="search-bar" />
    <button onClick={openModal} className="search-button">Buscar</button>
  </div>
);

const VehicleInfoModal = ({
  isOpen,
  onRequestClose,
  vehicleInfo,
  handlePaymentChange,
  openPaymentModal
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Vehicle Information"
    className="Modal"
    overlayClassName="Overlay"
  >
    <h2>Informações do Veículo</h2>
    <p><strong>Placa do Veículo:</strong> {vehicleInfo.plate}</p>
    <p><strong>Data e Hora de Entrada:</strong> {vehicleInfo.entryTime}</p>
    <p><strong>Data e Hora de Saída:</strong> {vehicleInfo.exitTime}</p>
    <p><strong>Valor a Ser Pago:</strong> {vehicleInfo.amountDue}</p>
    <div>
      <label htmlFor="paymentMethod"><strong>Forma de Pagamento:</strong></label>
      <select id="paymentMethod" onChange={handlePaymentChange}>
        <option value="">Selecione</option>
        <option value="Pix">Pix</option>
        <option value="Cartão">Cartão</option>
      </select>
    </div>
    <button onClick={openPaymentModal} className="pay-button">Pagar</button>
    <button onClick={onRequestClose} className="close-button">Fechar</button>
  </Modal>
);

const PaymentModal = ({ isOpen, onRequestClose, paymentMethod, vehicleInfo }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Payment"
    className="Modal"
    overlayClassName="Overlay"
  >
    {paymentMethod === 'Pix' && (
      <>
        <h2>Pagamento via Pix</h2>
        <p><strong>Placa do Veículo:</strong> {vehicleInfo.plate}</p>
        <p><strong>Valor a Ser Pago:</strong> {vehicleInfo.amountDue}</p>
        <p>Escaneie o código QR para efetuar o pagamento.</p>
        {/* Aqui você pode adicionar um QR code ou outros detalhes necessários para pagamento via Pix */}
      </>
    )}
    {paymentMethod === 'Cartão' && (
      <>
        <h2>Pagamento via Cartão</h2>
        <p><strong>Placa do Veículo:</strong> {vehicleInfo.plate}</p>
        <p><strong>Valor a Ser Pago:</strong> {vehicleInfo.amountDue}</p>
        <p>Insira os detalhes do cartão para efetuar o pagamento.</p>
        {/* Aqui você pode adicionar um formulário para pagamento via cartão */}
      </>
    )}
    <button onClick={onRequestClose} className="close-button">Fechar</button>
  </Modal>
);

export default App;
