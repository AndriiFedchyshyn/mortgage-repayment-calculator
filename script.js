document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.querySelector("#amount");
  const yearsInput = document.querySelector("#term");
  const rateInput = document.querySelector("#rate");
  const errors = document.querySelectorAll(".error"); // Collect all error elements

  // Allow only numbers and decimals for relevant inputs
  function restrictToNumbers(event) {
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }
  amountInput.addEventListener("keydown", restrictToNumbers);
  yearsInput.addEventListener("keydown", restrictToNumbers);
  rateInput.addEventListener("keydown", restrictToNumbers);

  // Add click to button
  document
    .querySelector(".calculate-button")
    .addEventListener("click", function () {
      // Hide all errors initially
      errors.forEach((error) => (error.style.display = "none"));
      let isValid = true;

      // Check if each field is empty and show errors accordingly
      if (amountInput.value.trim() === "") {
        document.querySelector(".mortgage-form .error").style.display = "block";
        isValid = false;
      }

      if (yearsInput.value.trim() === "") {
        document.querySelector(".term-form .error").style.display = "block";
        isValid = false;
      }

      if (rateInput.value.trim() === "") {
        document.querySelector(".interest-rate-form .error").style.display =
          "block";
        isValid = false;
      }

      // Check if a mortgage type is selected
      const selectedOption = document.querySelector(
        'input[name="options"]:checked'
      );
      if (!selectedOption) {
        document.querySelector(".mortgage-type .error").style.display = "block";
        isValid = false;
      }

      if (isValid) {
        const amount = parseFloat(amountInput.value);
        const years = parseInt(yearsInput.value);
        const rate = parseFloat(rateInput.value);
        const mortgageType = selectedOption.value;

        let monthlyPayment;
        let totalPayment;
        const monthlyInterest = rate / 100 / 12;
        const totalMonths = years * 12;

        // Repayment Mortgage Calculation
        if (mortgageType === "option1") {
          monthlyPayment =
            amount *
            ((monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
              (Math.pow(1 + monthlyInterest, totalMonths) - 1));
          totalPayment = monthlyPayment * totalMonths;
          // Interest Only Mortgage Calculation
        } else if (mortgageType === "option2") {
          monthlyPayment = (amount * (rate / 100)) / 12;
          totalPayment = monthlyPayment * totalMonths;
        }
        document.querySelector(
          ".monthly-repayment > p"
        ).textContent = `$${Number(
          monthlyPayment.toFixed(2)
        ).toLocaleString()}`;
        document.querySelector(".total-repayment > p").textContent = `$${Number(
          totalPayment.toFixed(2)
        ).toLocaleString()}`;

        document.querySelector(".empty-results").style.display = "none";
        document.querySelector(".completed-results").style.display = "flex";
      }
    });
});
