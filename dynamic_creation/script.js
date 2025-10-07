// Author: Nalin Cooper

//   dataset to build out the seelct option menu
const dataset = {
  question: "Do you prefer comfort over style? ",
  comfort: {
    question: "Are you more introverted or extroverted? ",
    introverted: {
      question: "Do you enjoy being outdoors? ",
      yes: { decision: "Hiking Boots" },
      no: { decision: "Slip On Sneakers" },
    },
    extroverted: {
      question: "Do you enjoy energetic group activities? ",
      yes: { decision: "Running Shoes" },
      no: { decision: "Casual Sneakers" },
    },
  },
  style: {
    question: "Do you enjoy standing out in a big crowd? ",
    yes: {
      question: "Do you prefer a bold or elegant look?",
      bold: { decision: "Colorful High-top sneakers" },
      elegant: { decision: "Designer Heels or Dress Shoes" },
    },
    no: {
      question: "Do you prefer structured or relaxed environments?",
      structured: {
        question: "Do you values tradition or innovation more?",
        tradition: { decision: "Classic Leather Shoes" },
        innovation: { decision: "Futuristic Sneakers" },
      },
      relaxed: { decision: "Loafers or Flats" },
    },
  },
};
const formData = [
  { label: "Full Name", type: "text", name: "fullName", required: true },
  { label: "Email", type: "email", name: "email", required: true },
  {
    label: "Phone Number",
    type: "string",
    name: "phoneNumber",
    required: false,
  },
  { label: "Submit", type: "submit", name: "submit", required: true },
];
// body styles
const body = document.getElementsByTagName("body")[0];
body.style.backgroundColor = "#dbe7ee";

function decisionTreeTemplate(tree, container) {
  const treeHeader = document.createElement("h1");
  treeHeader.style.color = "#000080";
  treeHeader.textContent = "Shoe Match Maker";
  treeHeader.style.textAlign = "Center";
  treeHeader.style.marginBottom = "20px";
  treeHeader.style.backgroundColor = "#fff";
  treeHeader.style.border = "2px solid #000080";
  treeHeader.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  treeHeader.style.borderRadius = "20px";
  treeHeader.style.padding = "20px";
  container.appendChild(treeHeader);

  function buildSelect(node) {
    // check if no there are no further branches, display only the decision

    if (node.decision) {
      const decisionCard = document.createElement("div");
      decisionCard.classList.add("decision-card");
      decisionCard.textContent = node.decision;
      decisionCard.style.backgroundColor = "#e0f7fa";
      decisionCard.style.borderRadius = "20px";
      decisionCard.style.border = "1px solid #00796b";
      decisionCard.style.color = "#004d40";
      decisionCard.style.padding = "30px";
      decisionCard.style.margin = "12px 0";
      decisionCard.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
      decisionCard.style.fontWeight = "bold";
      decisionCard.style.maxWidth = "600px";

      // clearContainer(formContainer);
      formContainer.appendChild(decisionCard);
      displayShoeImage(node.decision);

      requestAnimationFrame(() => {
        decisionCard.style.transition = "all 0.4s ease";
        decisionCard.style.opacity = "1";
        decisionCard.style.transform = "scale(1)";
      });

      const formWrapper = document.createElement("div");
      formWrapper.style.marginTop = "20px";
      formWrapper.style.opacity = "1";
      formWrapper.style.transform = "translateY(20px)";
      formWrapper.style.transition = "all 0.4s ease";
      formContainer.appendChild(formWrapper);

      buildForm(formData, formWrapper);
      requestAnimationFrame(() => {
        decisionCard.style.opacity = 1;
        decisionCard.style.transform = "translateY(0)";
      });

      console.log("form is built");
      return formContainer;
    }

    const optionWrapper = document.createElement("div");
    // creates the card styles
    const questionCard = document.createElement("div");
    questionCard.style.border = "1px solid #ddd";
    questionCard.style.borderRadius = "10px";
    questionCard.style.padding = "30px";
    questionCard.style.margin = "12px 0";
    questionCard.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    questionCard.style.backgroundColor = "#fff";
    questionCard.style.maxWidth = "600px";

    // js animations using requestAnimationFrame
    // helper functions

    function animateProperty(
      element,
      property,
      start,
      end,
      duration,
      unit = "",
      easing = (t) => t
    ) {
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = easing(progress);
        const value = start + (end - start) * eased;
        if (property === "transformX") {
          element.style.transform = `translateX(${value}${unit})`;
        } else {
          element.style[property] = value + unit;
        }

        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function animateShadow(element, start, end, duration) {
      let startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const blur = start.blur + (end.blur - start.blur) * progress;
        const spread = start.speed + (end.spread - start.spreed) * progress;
        element.style.boxShadow = `0 ${spread}px ${blur}px rgba(0,0,0,0.15)`;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function animateBorderColor(element, startColor, endColor, duration) {
      let startTime = null;
      function hexToRgb(hex) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255,
        };
      }
      const start = hexToRgb(startColor);
      const end = hexToRgb(endColor);

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const r = Math.round(start.r + (end.r - start.r) * progress);
        const g = Math.round(start.g + (end.g - start.g) * progress);
        const b = Math.round(start.b + (end.b - start.b) * progress);
        element.style.borderColor = `rgb(${r},${g},${b})`;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // slides the card into view
    requestAnimationFrame(() => {
      animateProperty(
        questionCard,
        "transformX",
        -100,
        0,
        400,
        "%",
        (t) => 1 - (1 - t) * (1 - t)
      );
    });

    // creates the questions
    if (node.question) {
      const label = document.createElement("label");
      label.textContent = node.question;
      label.style.display = "block";
      label.style.marginBottom = "6px";
      label.style.fontWeight = "bold";
      label.style.color = "green";
      questionCard.appendChild(label);
    }

    // creates the select menu
    // creates the options and appends them
    const select = document.createElement("select");
    const placeholder = document.createElement("option");
    placeholder.textContent = "--Select--";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // create options dynamically
    Object.keys(node).forEach((key) => {
      // checks if the key does not equal the question to create an option for it, style and append it to the select menu
      if (key !== "question" && key !== "decision") {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
      }
    });
    // border animation on focus/blur
    select.addEventListener("focus", () => {
      animateBorderColor(select, "#cccccc", "#2d6a4f", 300);
    });
    select.addEventListener("blur", () => {
      animateBorderColor(select, "#2d6a4f", "#cccccc", 300);
    });

    select.addEventListener("change", () => {
      while (optionWrapper.nextSibling) {
        container.removeChild(container.lastChild);
      }
      clearContainer(formContainer);
      const choice = select.value;
      container.appendChild(buildSelect(node[choice]));
    });

    questionCard.appendChild(select);

    optionWrapper.appendChild(questionCard);
    return optionWrapper;
  }
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.width = "100%";
  container.style.boxSizing = "border-box";
  container.style.padding = "40px";
  container.appendChild(buildSelect(tree));
}

// attempt at storage
// function will set data using cookies first
async function saveData(key, value) {
  if (navigator.cookieEnabled && "cookieStore" in window) {
    await cookieStore.set(key, value);
    console.log(`Saved [${key}] to cookies: `, value);
  } else {
    localStorage.setItem(key, value);
    console.log(`Saved [${key}] to localStorage: `, value);
  }
}

async function getData(key) {
  if (navigator.cookieEnabled && "cookieStore" in window) {
    let c = await cookieStore.get(key);
    console.log(`Retrieved [${key}] from cookies: `, c ? c.value : null);
    return c ? c.value : null;
  } else {
    const v = localStorage.getItem(key);
    console.log(`Retrieved [${key}] from localStorage: `, v);
    return localStorage.getItem(key);
  }
}

async function removeData(key) {
  if (navigator.cookieEnabled && "cookieStore" in window) {
    await cookieStore.delete(key);
    console.log(`Removed [${key}] from cookies`);
  }
  localStorage.removeItem(key);
  console.log(`Removed [${key}] from localStorage`);
}

async function checkFormCookies() {
  // i am going to need await for getting cookies
  //are cookies turned on
  // do i have your name
  let savedForm = null;
  if (navigator.cookieEnabled && "cookieStore" in window) {
    let c = await cookieStore.get("userFormData");
    savedForm = c ? c.value : null;
    console.log("Checking cookies for userFormData: ", savedForm);
  } else {
    savedForm = localStorage.getItem("userFormData");
    console.log("Checking localStorage for userFormData: ", savedForm);
  }
  if (savedForm) {
    const values = JSON.parse(savedForm);
    formData.forEach((field) => {
      if (field.type !== "submit") {
        const input = document.querySelector(`[name="${field.name}"]`);
        if (input) {
          input.value = values[field.name];
          console.log(
            `Restored radio ["${field.name}"][value="${values[field.name]}"]`
          );
        }
      }
    });
    console.log("Full form restored: ", values);
  } else {
    console.log("No saved form data found in storage");
  }
}

// CREATE FORM FOR USERS TO ENTER IN PERSONAL INFO
// randomly ick a rand and i could display it

// ADD STLES TO FOR
// animate the form display
const formContainer = document.getElementById("form-container");

function buildForm(formData, formContainer) {
  const form = document.createElement("form");

  // form header
  const formHeader = document.createElement("h1");
  formHeader.style.color = "#000080";
  formHeader.textContent = "User Information";
  formHeader.style.textAlign = "Center";
  formHeader.style.marginBottom = "20px";
  formHeader.style.backgroundColor = "#fff";
  formHeader.style.width = "100%";
  formHeader.style.border = "2px solid #000080";
  formHeader.style.borderRadius = "20px";
  formHeader.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  formHeader.style.padding = "20px";

  form.appendChild(formHeader);

  // style updates only one box for the form
  const formBox = document.createElement("div");
  formBox.style.border = "2px solid #00796b";
  formBox.style.borderRadius = "10px";
  formBox.style.padding = "24px 32px";
  formBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  formBox.style.maxWidth = "600px";
  formBox.style.margin = "0 auto";
  formBox.style.transition = "box-shadow 0.3 ease";
  formBox.style.alignItems = "center";
  formBox.style.justifyContent = "center";
  formBox.style.alignContent="center";

  // hover effects
  formBox.addEventListener("mouseenter", () => {
    formBox.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
  });
  formBox.addEventListener("mouseleave", () => {
    formBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  });

  formData.forEach((field) => {
    // wrapper per field
    const fieldWrapper = document.createElement("div");
    fieldWrapper.style.marginBottom = "16px";
    // add label if not radio (radio gets individual labels per option)
    if (field.type !== "checkbox" && field.type !== "submit") {
      const formLabel = document.createElement("label");
      formLabel.textContent = field.label;
      formLabel.htmlFor = field.name;
      formLabel.style.display = "block";
      formLabel.style.fontWeight = "600";
      formLabel.style.marginBottom = "10px";
      formLabel.style.alignItems = "center";
      fieldWrapper.appendChild(formLabel);
    }

    let input;

    if (field.type === "select") {
      input = document.createElement("select");
      input.name = field.name;

      // placeholder
      const placeholder = document.createElement("option");
      placeholder.textContent = "--Select--";
      placeholder.disabled = true;
      placeholder.selected = true;
      input.appendChild(placeholder);

      field.options.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
      fieldWrapper.appendChild(input);
    } else if (field.type === "radio") {
      // question text above group
      const question = document.createElement("p");
      question.textContent = field.label;
      fieldWrapper.appendChild(question);

      field.options.forEach((opt) => {
        const radioWrapper = document.createElement("label");
        radioWrapper.style.display = "block";

        input = document.createElement("input");
        input.type = "radio";
        input.name = field.name; // ✅ use correct group name
        input.value = opt;

        if (field.required) input.required = true;

        radioWrapper.appendChild(input);
        radioWrapper.appendChild(document.createTextNode(" " + opt));
        fieldWrapper.appendChild(radioWrapper);
      });
    } else if (field.type === "submit") {
      input = document.createElement("button");
      input.type = "submit";
      input.textContent = field.label || "Submit";
      input.style.marginTop = "16px";
      input.style.borderRadius = "10px";
      input.style.padding = "10px 10px";
      input.style.fontWeight = "bold";
      input.style.color = "#fff";
      input.style.backgroundColor = "#00796b";
      // hover effects
      input.addEventListener("mouseenter", () => {
        input.style.backgroundColor = "#005f56";
      });
      input.addEventListener("mouseleave", () => {
        input.style.backgroundColor = "#00796b";
      });
      fieldWrapper.appendChild(input);
      console.log("button made");
    } else {
      // text, email, number, etc
      input = document.createElement("input");
      input.type = field.type;
      input.name = field.name;
      input.style.boxSizing = "border-box";
      input.style.border = "1px solid #ccc";
      input.style.padding = "15px";

      if (field.required) input.required = true;
      if (field.minLength) input.minLength = field.minLength;
      if (field.min !== undefined) input.min = field.min;

      fieldWrapper.appendChild(input);
    }

    formBox.appendChild(fieldWrapper);
  });
  // appends everything together
  form.appendChild(formBox);
  formContainer.appendChild(form);

  // submit handling
  // added storage hookup
  function attachForm(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // collect values
      const formValues = {};
      formData.forEach((field) => {
        if (field.type === "radio") {
          const selected = [...form.elements[field.name]].find(
            (r) => r.checked
          );
          formValues[field.name] = selected ? selected.value : null;
        } else if (field.type !== "submit") {
          formValues[field.name] = form.elements[field.name].value;
        }
      });

      console.log("Form Submitted", formValues);
      alert("Form submitted successfully!");

      const dataString = JSON.stringify(formValues);
      console.log("JSON to be saved: ", dataString);
      // saved to cookies or localStorage
      if (navigator.cookieEnabled && "cookieStore" in window) {
        await cookieStore.set("userFormData", dataString);
        console.log("userFormData saved to cookies:", dataString);
      } else {
        localStorage.setItem("userFormData", dataString);
        console.log("userFormData saved to localStorage: ", dataString);
      }
      console.log("user wants shoe recs");
      const decisionCard = document.querySelector(".decision-card");
      if (decisionCard) {
        const decisionText = decisionCard.textContent.trim();
        console.log("decision detected", decisionText);
        setupRestartButton(form);
      } else {
        console.warn("No decision card found to display image");
      }
    });
  }

  // attach to container
  formContainer.appendChild(form);
  attachForm(form);
}

function validateForm(form, formData) {
  let errors = [];

  formData.forEach((field) => {
    let value = "";

    if (field.type === "radio") {
      const selected = form.querySelector(
        `input[name="${field.name}"]:checked`
      );
      value = selected ? selected.value : "";
      if (field.required && !value) {
        errors.push(`${field.label} is required.`);
      }
    } else {
      const input = form.elements[field.name];
      value = input ? input.value.trim() : "";

      if (field.required && value === "") {
        errors.push(`${field.label} is required.`);
      }

      if (field.type === "email" && value !== "") {
        // regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors.push("Please enter a valid email address.");
        }
      }
      if (field.type === "string" && value !== "") {
        if (isNaN(value)) {
          errors.push(`${field.label} must be a number.`);
        }
      }
    }
  });
  return errors;
}
function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// add restart button after form submission
function setupRestartButton(form) {
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Start Over";
  restartBtn.style.display = "block";
  restartBtn.style.margin = "20px auto";
  restartBtn.style.padding = "10px 20px";
  restartBtn.style.backgroundColor = "#00796b";
  restartBtn.style.color = "#fff";
  restartBtn.style.border = "none";
  restartBtn.style.borderRadius = "8px";
  restartBtn.style.cursor = "pointer";
  restartBtn.style.fontWeight = "bold";
  restartBtn.style.gap = "20px";
  restartBtn.addEventListener("mouseenter", () => {
    restartBtn.style.backgroundColor = "#00796b";
  });

  restartBtn.addEventListener("click", () => {
    // note to self to check if it is working
    console.log("Restarting the decision process..");
    clearContainer(formContainer);
    clearContainer(treeContainer);
    decisionTreeTemplate(dataset, treeContainer);
  });
  formContainer.appendChild(restartBtn);
}
// display shoe image based on decision
function displayShoeImage(decision) {
  // image map
  const imageMap = {
    "Hiking Boots": "assets/hiking-boots.jpg",
    "Running Shoes": "assets/running-shoes.jpg",
    "Slip On Sneakers": "assets/slip-on-sneakers.jpg",
    "Casual Sneakers": "assets/casual-sneakers.jpg",
    "Colorful High-top sneakers": "assets/colorful-hightop-sneaker.jpg",
    "Designer Heels or Dress Shoes": [
      "assets/dress-shoes.jpg",
      "assets/designer-heel.jpg",
    ],
    "Classic Leather Shoes": "assets/leather-shoes.jpg",
    "Futuristic Sneakers": "assets/futuristic-shoes.jpg",
    "Loafers or Flats": ["assets/loafers.jpg", "assets/flats.jpg"],
  };

  const images = imageMap[decision];
  if (!images) {
    console.warn("No matching image found for", decision);
    return;
  }
  document.querySelectorAll(".shoe-image").forEach((img) => img.remove());

  const imageSrc = Array.isArray(images) ? images : [images];

  const imgContainer = document.createElement("div");
  imgContainer.style.display = "flex";
  imgContainer.style.justifyContent = "center";
  imgContainer.style.gap = "20px";
  imgContainer.style.flexWrap = "wrap";
  imgContainer.style.marginTop = "20px";

  imageSrc.forEach((src) => {
    const img = document.createElement("img");
    img.classList.add("shoe-image");
    img.src = src;
    img.alt = decision;
    img.style.display = "block";
    img.style.margin = "20px auto";
    img.style.maxWidth = "250px";
    img.style.borderRadius = "12px";
    img.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    img.style.opacity = "0";
    img.style.transition = "opacity 1s ease";

    imgContainer.appendChild(img);
    // fades the images in
    requestAnimationFrame(() => {
      img.style.opacity = "1";
    });
  });

  formContainer.appendChild(imgContainer);
  console.log("Displayed image for:", decision, "-->", imageSrc);
}
// call function
const treeContainer = document.getElementById("decision-tree-container");
// const formContainer = document.getElementById("form-container");

decisionTreeTemplate(dataset, treeContainer);
const originalBuildSelect = decisionTreeTemplate.toString();
