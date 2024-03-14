var formValidators = {};

function initForms() {
    $(function () {
        $("form.js-form").each(function (index, form){
            setupForm(form);
        });
    });
}

function setupForm(form) {
    // upgrade URL to AJAX post
    form.action = form.getAttribute("data-action");
    form.removeAttribute("data-action");
    // setup reCAPTCHA explicitly
    var recaptcha = form.querySelector(".g-recaptcha");
    if (recaptcha) {
        grecaptcha.render(recaptcha);
        // require a reCAPTCHA response
        requireRecaptcha(form);
    }

    // enable form submit buttons
    formElementToggleActive(form, true);

    // setup additional analytics
    var formStarted = false;
    function interactionListener() {
        if (!formStarted) {
            formStarted = true;
            logFormEvent(form, "begin_form");
            // remove listener since we only need it once.
            $(form).find(":input").off("blur", interactionListener);
        }
    };

    // setup validation
    formValidators[form.id] = $(form).validate({
        submitHandler: function (form, event) {
            event.preventDefault();
            if (form.action && form.method.toLowerCase() === "post") {
                clearFormMessage(form);
                formElementToggleActive(form, false);
                ignoredFieldsToggleDisabled(form, true);
                ajaxPost(form.action, new FormData(form), function (event) {
                    formElementToggleActive(form, true);
                    ignoredFieldsToggleDisabled(form, false);
                    // reset the reCAPTCHA since it can only be submitted once
                    resetRecaptcha(form);
                    var data = JSON.parse(event.target.response);
                    if (data.success) {
                        var redirectLocation = form.hasAttribute("data-redirect") ? form.getAttribute("data-redirect") : "";
                        if (redirectLocation) {
                            window.location.href = redirectLocation;
                        } else {
                            showFormMessage(form, ".js-formMessage-success");
                            form.reset();
                            logFormEvent(form, "form_submitted");
                            formStarted = false;
                            $(form).find(":input").on("blur", interactionListener);
                        }
                    } else {
                        // validation failed
                        var errors = {};
                        var captchaFailed = false;
                        for (var key in data.errors) {
                            var errorMessage;
                            switch (data.errors[key]) {
                                case "recaptcha-failure":
                                    errorMessage = "reCAPTCHA failed validation, please complete the reCAPTCHA again.";
                                    captchaFailed = true;
                                    break;
                                default:
                                    errorMessage = "This field is invalid";
                                    break;
                            }
                            errors[key] = errorMessage;
                        }
                        formValidators[form.id].showErrors(errors);
                        if (captchaFailed) {
                            showFormMessage(form, ".js-formMessage-failure-captcha");
                        }
                        logFormEvent(form, "form_validation_failure");
                    }
                }, function (event) {
                    formElementToggleActive(form, true);
                    ignoredFieldsToggleDisabled(form, false);
                    // reset the reCAPTCHA since it can only be submitted once
                    resetRecaptcha(form);
                    showFormMessage(form, ".js-formMessage-failure-general");
                });
            }
        },
        invalidHandler: function (event, validator) {
            logFormEvent(form, "form_validation_failure");
        },
        ignore: ":hidden:not(.g-recaptcha-response)",
        errorPlacement: function (error, element) {
            if (element.attr("name") === "g-recaptcha-response") {
                error.appendTo(element.closest(".g-recaptcha"));
            } else {
                error.insertAfter(element);
            }
        }
    });

    $(form).find(":input").on("blur", interactionListener);
}

function ignoredFieldsToggleDisabled(form, isDisabled) {
    var fields = form.querySelectorAll('.ignore');
    if (fields && fields.length > 0) {
        for (var i = 0; i < fields.length; i++) {
            fields[i].disabled = isDisabled;
        }
    }
}

function requireRecaptcha(form) {
    var el = form.elements["g-recaptcha-response"];
    if (el) {
        el.required = true;
        el.setAttribute("data-msg", "Please complete the reCAPTCHA.");
    }
}

function resetRecaptcha(form) {
    if (form.querySelector(".g-recaptcha")) {
        if (grecaptcha) {
            grecaptcha.reset();
            requireRecaptcha(form);
        }
    }
}

function logFormEvent(form, eventAction, eventParams, isRecommendedEvent) {
    if (typeof eventParams !== "object") {
        eventParams = {};
    }
    if (!isRecommendedEvent) {
        if (!eventParams.event_label) {
            var name = form.elements["FormName"];
            if (name) {
                eventParams.event_label = name.value;
            }
        }
    }
    if (typeof gtag === "function") {
        gtag("event", eventAction, eventParams);
    }
}

function showFormMessage(form, message) {
    var eContainer = form.querySelector(".js-formMessages");
    if (eContainer) {
        var eMessage = eContainer.querySelector(message);
        if (eMessage) {
            eMessage.hidden = false;
        }
    }
}

function clearFormMessage(form) {
    var eContainer = form.querySelector(".js-formMessages");
    if (eContainer) {
        var eMessages = eContainer.querySelectorAll(".js-formMessage");
        if (eMessages) {
            for (i = 0; i < eMessages.length; i++) {
                eMessages[i].hidden = true;
            }
        }
    }
}

function formElementToggleActive(form, active) {
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element instanceof HTMLInputElement && element.type.toLowerCase() === "submit" || element instanceof HTMLButtonElement && element.type.toLowerCase() === "submit") {
            element.disabled = !active;
        } else if (element instanceof HTMLInputElement) {
            element.readOnly = !active;
        }
    }
}

function ajaxPost(url, data, successCallback, errorCallback) {
    var submitRequest = new XMLHttpRequest();
    submitRequest.addEventListener("loadend", function (event) {
        if (event.target.readyState === 4 && event.target.status >= 200 && event.target.status < 300) {
            if (typeof successCallback === "function") {
                successCallback.call(submitRequest, event);
            }
        } else {
            if (typeof errorCallback === "function") {
                errorCallback.call(submitRequest, event);
            }
        }
    });
    submitRequest.open("post", url);
    submitRequest.send(data);
}
