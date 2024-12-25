
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

// Initialize selectedBenefits based on default benefits
let selectedBenefits = {};

Object.keys(benefitsData).forEach((plan) => {
    const defaultBenefit = benefitsData[plan].find((benefit) => benefit.name.includes("(Deft.)"));
    if (defaultBenefit) {
        selectedBenefits[plan] = defaultBenefit;
    }
});

const walletAmount = 1400;

const plansContainer = document.getElementById("plans-container");
const benefitsContainer = document.getElementById("benefits-container");

// Render plans
Object.keys(benefitsData).forEach((plan) => {
    const planElement = document.createElement("h6");
    plan.split("").forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        planElement.appendChild(span);
        span.style.color = getColor(plan);
    });
    plansContainer.appendChild(planElement);

    // Render benefits for the plan
    const benefitsWrapper = document.createElement("div");
    benefitsWrapper.className = `d-flex flex-wrap`;
    benefitsData[plan].forEach((benefit, index) => {
        const benefitBox = document.createElement("div");
        benefitBox.className = selectedBenefits[plan].name == benefit.name ? "col-md-2 Box-Modify text-center selected-" + plan.toLowerCase() : "col-md-2 Box-Modify text-center";

        benefitBox.innerHTML = `
        <div class="text-success Points-Modify"><label class"font-weight-bold'>${benefit.points}</label></div>
        <div class="pb-2 pt-4"><label class"font-weight-bold'>${benefit.name}</label></div>
       <div> <input type="checkbox" name="${plan}" data-plan="${plan}" data-index="${index}"  ${selectedBenefits[plan] && selectedBenefits[plan].name === benefit.name ? 'checked' : ''} /></div>
        <div class="row">
          <div class="align-self-end col-6 Details-Modify pl-0 pr-5">Details</div>
          <div class="col-6 pr-0"><label class="float-right Multiplier-Modify">x${benefit.multiplier}</label></div>
        </div>
      `;
        benefitsWrapper.appendChild(benefitBox);
    });
    benefitsContainer.appendChild(benefitsWrapper);
    updateSummary();
});

// Handle benefit selection
document.addEventListener("change", (event) => {


    const target = event.target;
    if (target.type === "checkbox") {
        const checkboxes = document.querySelectorAll('input[name="' + event.target.name + '"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        }); event.target.parentElement.parentElement.className = "col-md-2 Box-Modify text-center selected-" + event.target.name.toLowerCase()

        const plan = target.dataset.plan;
        const index = target.dataset.index;
        selectedBenefits[plan] = benefitsData[plan][index];

        updateSummary();
    }
});

// Update summary section
function updateSummary() {
    const summaryContainer = document.getElementById("benefits-summary");
    summaryContainer.innerHTML = "";

    let usedCost = 0;
    Object.keys(selectedBenefits).forEach((plan) => {
        const benefit = selectedBenefits[plan];
        usedCost += benefit.points * benefit.multiplier;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${benefit.points}</td>
            <td>${benefit.multiplier}</td>
            <td>${benefit.points * benefit.multiplier}</td>
        `;
        summaryContainer.appendChild(row);
    });

    // Create the total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td></td>
        <td class="font-weight-bold">Total</td>
        <td class="font-weight-bold">${calculateSubtotal()}</td>
    `;

    // Append the total row to the container
    summaryContainer.appendChild(totalRow);

    document.getElementById("used-cost").textContent = usedCost;
    document.getElementById("available").textContent = usedCost < walletAmount ? walletAmount - usedCost : 0;
    document.getElementById("you-pay").textContent = Math.max(0, usedCost - walletAmount);
}
function calculateSubtotal() {
    let subtotal = 0;
    for (const plan in selectedBenefits) {
        if (selectedBenefits[plan]) {
            subtotal +=
                selectedBenefits[plan].points * selectedBenefits[plan].multiplier;
        }
    }
    return subtotal;
};
// Show invoice on checkout
document.querySelector(".btn-checkout").addEventListener("click", () => {
    const invoiceContainer = document.getElementById("invoice-summary");
    invoiceContainer.innerHTML = "";

    Object.keys(selectedBenefits).forEach((plan) => {
        const benefit = selectedBenefits[plan];

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${benefit.name}</td>
        <td>Details</td>
        <td>${benefit.points}</td>
        <td>${benefit.multiplier}</td>
        <td>${benefit.points * benefit.multiplier}</td>
      `;
        invoiceContainer.appendChild(row);
    });


    document.getElementById("invoice-section").style.display = "block";
});

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
