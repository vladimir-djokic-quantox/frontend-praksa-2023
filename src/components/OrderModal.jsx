import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, handleClearCart, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "name" || name === "city" || name === "country") &&
      !/^[a-zA-Z\s]*$/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only letters are allowed",
      }));
      return;
    }

    if (name === "cardNumber" && !/^[0-9]{0,16}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Card number must have exactly 16 digits",
      }));
      return;
    }
    if (name === "expDate" && !/^[0-9/]*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only numbers and '/' are allowed",
      }));
      return;
    }

    if (name === "cvv" && !/^[0-9]{0,3}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "CVV must have exactly 3 digits",
      }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = () => {
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSuccessMessage("Order submitted successfully!");
    setShowSuccessMessage(true);

    setFormData({
      name: "",
      address: "",
      city: "",
      country: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    });
    setErrors({});

    setTimeout(() => {
      handleClearCart();
      onClose();
    }, 2500);
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-gray-600 opacity-50"
        onClick={onClose}
      ></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-semibold mb-4">Your Information</div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`mt-1 p-2 border rounded w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                className={`mt-1 p-2 border rounded w-full ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">City:</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                className={`mt-1 p-2 border rounded w-full ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Country:</span>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                className={`mt-1 p-2 border rounded w-full ${
                  errors.country ? "border-red-500" : ""
                }`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </label>
          </div>
        </div>

        <div>
          <div className="text-2xl font-semibold mb-4">Card Information</div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Card Number:</span>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className={`mt-1 p-2 border rounded w-full ${
                  errors.cardNumber ? "border-red-500" : ""
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </label>

            <div className="flex space-x-4 ">
              <label className="block flex-1">
                <span className="text-gray-700">Expiration Date:</span>
                <input
                  type="text"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={`mt-1 p-2 border rounded w-full ${
                    errors.expDate ? "border-red-500" : ""
                  }`}
                />
                {errors.expDate && (
                  <p className="text-red-500 text-sm">{errors.expDate}</p>
                )}
              </label>

              <label className="block flex-1">
                <span className="text-gray-700">CVV:</span>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="XXX"
                  className={`mt-1 p-2 border rounded w-full ${
                    errors.cvv ? "border-red-500" : ""
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv}</p>
                )}
              </label>
            </div>

            <div className="flex items-center ">
              <img src="src/images/Visa.png" alt="Visa" className=" w-14 h-10" />
              <img src="/src/images/Mastercard.png" alt="MasterCard" className=" w-14 h-10"/>
              <img src="/src/images/PayPal.png" alt="PayPal" className="w-14 h-10"/>
              <img src="/src/images/ApplePay.png" alt="ApplePay" className="w-14 h-10"/>
              <img src="/src/images/Bitcoin.png" alt="Bitcoin" className="w-14 h-10" />
              <img src="/src/images/GooglePay.png" alt="GooglePay" className="w-14 h-10"/>
              <img src="/src/images/Skrill.png" alt="Skrill" className="w-14 h-10"/>
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-6 flex items-end gap-5 justify-end">
          <p className="mr-4 font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg border border-gray-300">
          <p className="text-green-500 text-lg font-semibold">
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderModal;
