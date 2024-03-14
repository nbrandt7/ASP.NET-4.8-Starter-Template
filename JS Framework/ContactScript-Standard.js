(function (exports) {
  const recaptchaField = "g-recaptcha-response";
  var formValidators = {},
    formStarted = {},
    _recaptchaKey = "";

  function getGoogleRecaptchaSiteKey() {
    if (_recaptchaKey) {
      return _recaptchaKey;
    }
    var script = document.getElementById("GoogleRecaptchaScript");
    var key = "";
    if (script && script.src) {
      var params = new URL(script.src).searchParams;
      key = params.has("render") ? params.get("render") : "";
    }
    _recaptchaKey = key;
    return key;
  }

  exports.setupForm = function (form) {
    if (formValidators.hasOwnProperty(form.id)) {
      return;
    }
    form.action = form.getAttribute("data-action");
    form.removeAttribute("data-action");

    // enable form submit buttons
    formElementToggleActive(form, true);

    // setup additional analytics
    formStarted[form.id] = false;

    // setup validation
    formValidators[form.id] = $(form).validate({
      submitHandler: function (form, event) {
        if (form.action && form.method.toLowerCase() === "post") {
          clearFormMessage(form);
          formElementToggleActive(form, false);
          ignoredFieldsToggleDisabled(form, true);
          var recaptchaSiteKey = getGoogleRecaptchaSiteKey();
          if (recaptchaSiteKey && typeof grecaptcha === "object") {
            // action name validated server-side, do not change
            grecaptcha
              .execute(recaptchaSiteKey, { action: "ContactFormSubmission" })
              .then(function (token) {
                submitForm(form, token);
              });
          } else {
            // unable to execute the recaptcha
            showFormMessage(form, ".js-formMessage-failure");
          }
        }
      },
      invalidHandler: function () {
        logFormEvent(form, "form_validation_failure");
      },
      errorPlacement: function (error, element) {
        error.insertAfter(element);
      },
    });

    $(form)
      .find(":input")
      .on("blur", interactionListener)
      .on("change", function () {
        $(form)
          .find('button[type="submit"]')
          .toggleClass("form-valid", formValidators[form.id].checkForm());
      });
  };

  function interactionListener() {
    var form = $(this).parents("form")[0];
    if (!formStarted[form.id]) {
      formStarted[form.id] = true;
      logFormEvent(form, "begin_form");
      // remove listener since we only need it once.
      $(form).find(":input").off("blur", interactionListener);
    }
  }

  function submitForm(form, recaptchaToken) {
    $(form).find('button[type="submit"]').addClass("loading");
    var formData = new FormData(form);
    if (recaptchaToken) {
      formData.append(recaptchaField, recaptchaToken);
    }
    $.ajax({
      type: "POST",
      url: form.action,
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
    }).then(
      function (data) {
        formElementToggleActive(form, true);
        ignoredFieldsToggleDisabled(form, false);
        if (data.success) {
          var redirectLocation = form.hasAttribute("data-redirect")
            ? form.getAttribute("data-redirect")
            : "";
          if (redirectLocation) {
            window.location.href = redirectLocation;
          } else {
            $(form).find('button[type="submit"]').removeClass("loading");
            showFormMessage(form, ".js-formMessage-success");
            form.reset();
            logFormEvent(form, "form_submitted");
            formStarted[form.id] = false;
            $(form).find(":input").on("blur", interactionListener);
          }
        } else {
          $(form).find('button[type="submit"]').removeClass("loading");
          // validation failed
          var errors = {};
          var captchaFailed = false;
          for (var key in data.errors) {
            var field = form.elements[key];
            var errorMessage;
            switch (data.errors[key]) {
              case "recaptcha-failure":
                errorMessage =
                  "reCAPTCHA failed validation, please complete the reCAPTCHA again.";
                captchaFailed = true;
                break;
              case "file-extension-invalid":
                errorMessage = "Please enter a value with a valid extension.";
                break;
              case "file-size-invalid":
                var sizes = [0, 5];
                try {
                  sizes = JSON.parse(
                    field.getAttribute("data-rule-maxfilesize")
                  );
                } catch (e) {}
                errorMessage = $.validator
                  .format("Please select a file less than {1} megabytes.")
                  .apply(this, sizes);
                break;
              default:
                errorMessage = "This field is invalid";
                break;
            }
            if (key != recaptchaField) {
              errors[key] = errorMessage;
            }
          }
          formValidators[form.id].showErrors(errors);
          if (captchaFailed) {
            showFormMessage(form, ".js-formMessage-failure");
          }
          logFormEvent(form, "form_validation_failure");
        }
      },
      function () {
        $(form).find('button[type="submit"]').removeClass("loading");
        formElementToggleActive(form, true);
        ignoredFieldsToggleDisabled(form, false);
        showFormMessage(form, ".js-formMessage-failure");
      }
    );
  }

  function ignoredFieldsToggleDisabled(form, isDisabled) {
    var fields = form.querySelectorAll(".ignore");
    if (fields && fields.length > 0) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = isDisabled;
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
      if (
        (element instanceof HTMLInputElement &&
          element.type.toLowerCase() === "submit") ||
        (element instanceof HTMLButtonElement &&
          element.type.toLowerCase() === "submit")
      ) {
        element.disabled = !active;
      } else if (element instanceof HTMLInputElement) {
        element.readOnly = !active;
      }
    }
  }
})((this.ContactForms = {}));

function initForms() {
  $(function () {
    var forms = document.querySelectorAll("form.js-ContactForm");
    for (var i = 0; i < forms.length; i++) {
      ContactForms.setupForm(forms[i]);
    }
  });
}
function loadScript(x) {
  var p = $.Deferred();
  var el = document.createElement("script");
  el.onload = p.resolve;
  el.onerror = p.reject;
  el.type = "text/javascript";
  el.async = "async";
  el.defer = "defer";
  for (key in x) {
    el[key] = x[key];
  }
  document.body.appendChild(el);
  return p.promise();
}
function loadStyle(src) {
  var s = document.createElement("link");
  s.rel = "stylesheet";
  s.href = src;
  document.head.appendChild(s);
}

(function (exports) {
  let blockedDates = [],
    blockedRanges = [];
  const timeSlots = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    },
    allSlots = [];

  const utcRegex =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})(\.?\d{0,3})[Z]{1}$/;
  const dRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})/;
  const noSecRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})/;
  var isInit = false;

  var formatDateObj = function (p) {
    if (p == undefined) {
      return "";
    }
    return formatDate(p.getFullYear(), p.getMonth(), p.getDate());
  };
  var formatDateTimeObj = function (p) {
    if (p == undefined) {
      return "";
    }
    return formatDateTime(
      p.getFullYear(),
      p.getMonth(),
      p.getDate(),
      p.getHours(),
      p.getMinutes(),
      p.getSeconds()
    );
  };
  var formatDateTimeObjUtc = function (p) {
    if (p == undefined) {
      return "";
    }
    return (
      formatDateTime(
        p.getUTCFullYear(),
        p.getUTCMonth(),
        p.getUTCDate(),
        p.getUTCHours(),
        p.getUTCMinutes(),
        p.getUTCSeconds()
      ) + "Z"
    );
  };
  var formatDateTime = function (y, mm, d, h, m, s) {
    mm++;
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (d < 10) {
      d = "0" + d;
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    return y + "-" + mm + "-" + d + "T" + h + ":" + m + ":" + s;
  };

  let formatDate = function (y, mm, d) {
    mm++;
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (d < 10) {
      d = "0" + d;
    }
    return mm + "/" + d + "/" + y;
  };

  function UtcInput(container) {
    var self = this;
    self.con = container;
    self.hidden = self.con.querySelector('input[type="hidden"]');
    self.$hidden = $(self.hidden);
    var $el = $(self.con).find(".js-Date");
    let minDate = new Date();
    minDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate() + 3
    );
    const bail = 60;
    let hasDate = false,
      retries = 0;
    do {
      if (showDate(minDate)[0]) {
        hasDate = true;
      } else {
        minDate = new Date(
          minDate.getFullYear(),
          minDate.getMonth(),
          minDate.getDate() + 1
        );
        retries++;
      }
    } while (!hasDate && retries < bail);

    $el.datepicker({
      beforeShowDay: showDate,
      defaultDate: minDate,
      minDate,
      onSelect: toggleTimes,
    });

    function showDate(date) {
      let timeSlot = timeSlots[date.getDay()];
      if (timeSlot.length == 0) {
        return [false, ""];
      }
      for (var i = 0; i < timeSlot.length; i++) {
        let times = timeSlot[i].split(":");
        let d = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          times[0],
          times[1],
          times[2]
        );
        if (!isBlocked(d)) {
          return [true, ""];
        }
      }
      return [false, ""];
    }
    function toggleTimes(dateText) {
      if (typeof dateText === "string") {
        $("#PickedDate").val(dateText);
      } else {
        $("#PickedDate").val(formatDateObj(dateText));
      }
      let d = moment(dateText, "MM/DD/YYYY");
      let ts = timeSlots[d.day()];
      $(".js-Time").hide().prop("disabled", true).addClass("disabled");
      let timeSel = $("#AppointmentTime");
      let currTime = timeSel[0].value; //val() does some weird data conversion on time spans
      let hasCurrTime = false;
      for (var i = 0; i < ts.length; i++) {
        let t = ts[i].split(":");
        d.set("hour", t[0]);
        d.set("minute", t[1]);
        d.set("second", t[2]);
        let $timeInp = $('.js-Time[value="' + ts[i] + '"]');
        if (!isBlocked(d)) {
          $timeInp.show().prop("disabled", false).removeClass("disabled");
          if (!hasCurrTime) {
            hasCurrTime = ts[i] == currTime;
          }
        }
      }
      if (!hasCurrTime) {
        timeSel.find(":not(.disabled)").first().prop("selected", true);
      }
    }
    function setUtcPicker() {
      self.hidden.value = formatDateTimeObjUtc(exports.Parse(this.value));
      self.$hidden.trigger("change");
      if (self.date.hasAttribute("aria-required")) {
        self.$hidden.valid();
      }
    }

    setTimeout(() => {
      toggleTimes($el.datepicker("getDate"));
    }, 100);
  }

  function isBlocked(d) {
    for (var j = 0; j < blockedDates.length; j++) {
      if (blockedDates[j].isSame(d)) {
        return true;
      }
    }
    let dMoment = moment(d);
    for (var x = 0; x < blockedRanges.length; x++) {
      let b = blockedRanges[x];
      if (dMoment.isBetween(b.Start, b.End, undefined, "[]")) {
        return true;
      }
    }
    return false;
  }

  exports.Parse = function (str) {
    if (!str) {
      return undefined;
    }
    if (utcRegex.test(str)) {
      var a = str.split(/[^0-9]/);
      return new Date(Date.UTC(a[0], a[1] - 1, a[2], a[3], a[4], a[5]));
    }
    if (dRegex.test(str)) {
      var a = str.split(/[^0-9]/);
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    }
    if (noSecRegex.test(str)) {
      var a = str.split(/[^0-9]/);
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], 0);
    }
    return undefined;
  };

  exports.Init = function () {
    let promise = $.Deferred();
    if (isInit) {
      promise.resolve();
      return promise;
    }
    isInit = true;
    loadStyle(
      "/shared_Gen/jQuery/jQuery-ui/v1.10.2/themes/base/minified/jquery.ui.core.min.css"
    );
    loadStyle(
      "/shared_Gen/jQuery/jQuery-ui/v1.10.2/themes/base/minified/jquery.ui.datepicker.min.css"
    );
    loadStyle(
      "/shared_Gen/jQuery/jQuery-ui/v1.10.2/themes/base/minified/jquery.ui.theme.min.css"
    );
    let promises = [
      loadScript({ src: "/Content/js/moment-2.17.1.min.js" }),
      loadScript({
        src: "/shared_Gen/jquery/jquery-ui/v1.10.2/ui/minified/jquery-ui.min.js",
      }),
    ];
    $.when
      .apply(this, promises)
      .then(() => {
        let p1 = $.post("/find/Contact/AjaxGetTimeData").done(function (resp) {
          for (var i = 0; i < resp.BlockedTimes.length; i++) {
            blockedDates.push(moment(resp.BlockedTimes[i]));
          }
          for (var i = 0; i < resp.BlockedRanges.length; i++) {
            blockedRanges.push({
              Start: moment(resp.BlockedRanges[i].BlockStart),
              End: moment(resp.BlockedRanges[i].BlockEnd),
            });
          }
          for (var i = 0; i < resp.Timeslots.length; i++) {
            let ts = resp.Timeslots[i];
            if (allSlots.indexOf(ts.TimeStart) == -1) {
              allSlots.push(ts.TimeStart);
            }
            if (timeSlots[ts.DayOfWeek].indexOf(ts.TimeStart) == -1) {
              timeSlots[ts.DayOfWeek].push(ts.TimeStart);
            }
          }
        });
        return $.when.apply(this, [p1]);
      })
      .then(() => {
        new UtcInput(document.getElementById("datepicker"));
      });
  };
})((this.UtcFormat = {}));

(function (exports) {
  const evs = "blur keypress keydown change click",
    recapSel = "recaptchaSrc";
  let reCapTimeout,
    isInit = false,
    loadFired = false,
    $watchEls;

  function loadReCaptcha() {
    if (loadFired) {
      return true;
    }
    loadFired = true;
    $watchEls.off(evs, loadReCaptcha);
    if (reCapTimeout) {
      try {
        clearTimeout(reCapTimeout);
        reCapTimeout = null;
      } catch {}
    }
    let recapEl = document.getElementById(recapSel);
    if (recapEl) {
      $.when(
        loadScript({
          src: "/shared_Gen/jQuery/Validate/1.16.0/jquery.validate.min.js",
        })
      ).then(
        (res) => {
          var promises = [];
          [
            {
              src: "/shared_Gen/jQuery/Validate/1.16.0/additional-methods.min.js",
            },
            { src: "/Content/js/jquery.validate.additional-methods.js" },
          ].forEach(function (p) {
            promises.push(loadScript(p));
          });
          $.when.apply(promises).done(function () {
            loadScript({
              src: recapEl.value,
              id: "GoogleRecaptchaScript",
            });
          });
          recapEl.parentNode.removeChild(recapEl);
        },
        (rej) => {}
      );
    }
  }

  exports.Init = () => {
    if (isInit) {
      return;
    }
    isInit = true;

    if ($("#datepicker").length > 0) {
      UtcFormat.Init();
    }
    $watchEls = $("form.js-ContactForm").find("input,select,textarea");
    $watchEls.one(evs, loadReCaptcha);
    reCapTimeout = setTimeout(loadReCaptcha, 10000);
  };
})((this.recapLoader = {}));

$(document).ready(recapLoader.Init);
