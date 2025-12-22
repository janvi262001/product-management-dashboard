import Modal from "react-modal";

Modal.setAppElement("#root"); // important for accessibility

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl p-6 max-w-md mx-auto mt-40 outline-none shadow-lg"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
}
