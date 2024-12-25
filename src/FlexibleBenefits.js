import React, { useState } from 'react';

const FlexibleBenefits = () => {
  // State to manage selected benefits and whether to show the invoice
  const [selectedBenefits, setSelectedBenefits] = useState({
    Health: { name: "Benefit 2 (Deft.)", points: 200, multiplier: 2 },
    Life: { name: "Benefit 2 (Deft.)", points: 400, multiplier: 1 },
    Accident: { name: "Benefit 3 (Deft.)", points: 600, multiplier: 1 },
  });

  const [showInvoice, setShowInvoice] = useState(false);

  // Data structure defining available benefits and their details
  const benefitsData = {
    Health: [
      { name: "Benefit 1", points: 100, multiplier: 1 },
      { name: "Benefit 2 (Deft.)", points: 200, multiplier: 2 },
      { name: "Benefit 3", points: 300, multiplier: 3 },
      { name: "Benefit 4", points: 400, multiplier: 4 },
    ],
    Life: [
      { name: "Benefit 1", points: 300, multiplier: 0.5 },
      { name: "Benefit 2 (Deft.)", points: 400, multiplier: 1 },
      { name: "Benefit 3", points: 450, multiplier: 2 },
      { name: "Benefit 4", points: 600, multiplier: 1 },
    ],
    Accident: [
      { name: "Benefit 1", points: 100, multiplier: 1 },
      { name: "Benefit 2", points: 250, multiplier: 1 },
      { name: "Benefit 3 (Deft.)", points: 600, multiplier: 1 },
      { name: "Benefit 4", points: 750, multiplier: 1 },
    ],
  };

  // Function to handle selecting a benefit for a plan
  const handleBenefitSelect = (plan, benefitIndex) => {
    const selectedBenefit = benefitsData[plan][benefitIndex];
    setSelectedBenefits((prevState) => ({
      ...prevState,
      [plan]: selectedBenefit,
    }));
  };

  // Function to calculate the total used cost of selected benefits
  const calculateUsedCost = () => {
    let UsedCost = 0;
    for (const plan in selectedBenefits) {
      if (selectedBenefits[plan]) {
        UsedCost +=
          selectedBenefits[plan].points * selectedBenefits[plan].multiplier;
      }
    }
    return UsedCost;
  };

  // Function to calculate the subtotal of selected benefits
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const plan in selectedBenefits) {
      if (selectedBenefits[plan]) {
        subtotal +=
          selectedBenefits[plan].points * selectedBenefits[plan].multiplier;
      }
    }
    return subtotal;
  };

  // Calculating various values for display
  const UsedCost = calculateUsedCost();
  const walletAmount = 1400;
  const youPay = UsedCost > walletAmount ? UsedCost - walletAmount : 0;
  const available = UsedCost < walletAmount ? walletAmount - UsedCost : 0;
  const subtotal = calculateSubtotal();

  // Function to handle the checkout process
  const handleCheckout = () => {
    setShowInvoice(true);
  };

  // Function to print the invoice
  const handlePrint = () => {
    window.print();    
  };

  // Function to get color based on plan
  function getColor(plan) {
    switch (plan) {
      case "Health":
        return "blue";
      case "Life":
        return "green";
      case "Accident":
        return "orange";
      default:
        return "black";
    }
  }

  return (
    <div className="container-fluid p-0">
      <h3 className="Header_Title mb-0 mt-1">Flexible Benefits Solution</h3>
      <div className="ml-5 p-0 row">
        {/* Display plans */}
        <div className="plans_section col-md-1 ml-2">
          {Object.keys(benefitsData).map((plan, index) => (
            <h6 key={plan}>
              {plan.split("").map((letter, index) => (
                <span key={index} style={{ color: getColor(plan) }}>
                  {letter}
                </span>
              ))}
              {index < Object.keys(benefitsData).length - 1 && " "}
            </h6>
          ))}
        </div>
        {/* Display benefits selection */}
        <div className="col-md-12 col-lg-8">
          {Object.keys(benefitsData).map((plan) => (
            <div className="d-flex flex-wrap" key={plan}>
              {benefitsData[plan].map((benefit, index) => (
                <div
                  className={`col-md-2 Box-Modify ${
                    selectedBenefits[plan] &&
                    selectedBenefits[plan].name === benefit.name
                      ? `selected-${plan.toLowerCase()}`
                      : ""
                  }`}
                  key={index}
                >
                  <div className="text-success Points-Modify">
                    <label className="font-weight-bold">{benefit.points}</label>
                  </div>
                  <div className="pb-2 pt-4">
                    <label className="font-weight-bold">{benefit.name}</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={
                        selectedBenefits[plan] &&
                        selectedBenefits[plan].name === benefit.name
                      }
                      onChange={() => handleBenefitSelect(plan, index)}
                    />
                  </div>
                  <div className="row">
                    <div className="align-self-end col-6 Details-Modify pl-0 pr-5">
                      Details
                    </div>
                    <div className="col-6 pr-0">
                      <label className="float-right Multiplier-Modify">
                        X{benefit.multiplier}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Display wallet and checkout */}
        <div className="col-md-12 col-lg-3 mt-4 pt-2">
          <label className="Label-Modify mb-4 ">Wallet Allocation : 1400</label>
          <div className="col-12">
            {/* Display selected benefits and their subtotal */}
            <table className="table">
              <thead>
                <tr>
                  <th>Point</th>
                  <th>Multiplier</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedBenefits).map(
                  (plan) =>
                    selectedBenefits[plan] && (
                      <tr key={plan}>
                        <td>{selectedBenefits[plan].points}</td>
                        <td>{selectedBenefits[plan].multiplier}</td>
                        <td>
                          {selectedBenefits[plan].points *
                            selectedBenefits[plan].multiplier}
                        </td>
                      </tr>
                    )
                )}
                <tr>
                  <td></td>
                  <td className="font-weight-bold">Total</td>
                  <td className="font-weight-bold">{subtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Display wallet details and checkout button */}
          <div className="Box-Modify col-11 p-0" style={{ marginLeft: "12px" }}>
            <div className="col-12 d-flex">
              <div className="col-8">
                <p className="font-weight-bold">Wallet Amount</p>
              </div>
              <div className="col-4">
                <p className="font-weight-bold">{walletAmount}</p>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-8">
                <p className="font-weight-bold">Used</p>
              </div>
              <div className="col-4">
                <p className="font-weight-bold">{UsedCost}</p>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-8">
                <p className="font-weight-bold">Available</p>
              </div>
              <div className="col-4">
                <p className="font-weight-bold">{available}</p>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-8">
                <p className="font-weight-bold">You Pay</p>
              </div>
              <div className="col-4">
                <p className="font-weight-bold">{youPay}</p>
              </div>
            </div>
          </div>
          {/* Checkout button */}
          <div className="col-12">
            <button
              className="Button-Modify py-1 btn btn-sm"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {/* Display invoice if checkout is initiated */}
      {showInvoice && (
        <div className="col-md-12 mt-5 mt-lg-3">
          <h5 className="Summary-Modify">Page 2 - Summary</h5>
          {/* Display invoice summary */}
          <table id="invoice-table" className="table table-bordered table-sm">
            <thead>
              <tr>
                <th className="InvoiceHeader_Title" colSpan={5}>
                  Flexible Benefits Solution - Invoice
                </th>
              </tr>
              <tr>
                <th className="InvoiceTH-Modify">Benefit</th>
                <th className="InvoiceTH-Modify">Description</th>
                <th className="InvoiceTH-Modify">Points</th>
                <th className="InvoiceTH-Modify">Multiplier</th>
                <th className="InvoiceTH-Modify">Amount</th>
              </tr>
            </thead>
            <tbody className="font-weight-bold">
              {Object.keys(selectedBenefits).map(
                (plan) =>
                  selectedBenefits[plan] && (
                    <tr key={plan}>
                      <td className="SummaryTD-Modify">
                        {selectedBenefits[plan].name}
                      </td>
                      <td className="SummaryTD-Modify">Details</td>
                      <td className="SummaryTD-Modify">
                        {selectedBenefits[plan].points}
                      </td>
                      <td className="SummaryTD-Modify">
                        {selectedBenefits[plan].multiplier}
                      </td>
                      <td className="SummaryTD-Modify">
                        {selectedBenefits[plan].points *
                          selectedBenefits[plan].multiplier}
                      </td>
                    </tr>
                  )
              )}
              <tr>
                <td></td>
                <td className="InvoiceTD-Modify">Total</td>
                <td className="InvoiceTD-Modify">
                  {Object.keys(selectedBenefits).reduce((totalPoints, plan) => {
                    if (selectedBenefits[plan]) {
                      totalPoints += selectedBenefits[plan].points;
                    }
                    return totalPoints;
                  }, 0)}
                </td>
                <td></td>
                <td className="InvoiceTD-Modify">{subtotal}</td>
              </tr>
            </tbody>
          </table>
          <div className="col-12 mt-5 ">
            <button
              className="PrintBtn-Modify py-1 btn btn-sm"
              onClick={handlePrint}
            >
              Print PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlexibleBenefits;
