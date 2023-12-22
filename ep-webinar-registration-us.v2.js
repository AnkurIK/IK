$(document).ready(function () {
  $(".webinartype, .webinartype_footer").change(function () {
    $.getJSON("https://get.geojs.io/v1/ip/geo.json", function (t) { }).done(function (t) {
      timezone = t.timezone, v_country = t.country;
      if (v_country == "India") {
        webinarType = "REGULAR";
        $(".webinartype, .webinartype_footer").attr("data-webinar-type", webinarType);
      } else if (v_country !== "India") {
        webinarType = "SWITCH_UP";
        webinarType2 = "REGULAR";
        $(".webinartype, .webinartype_footer").attr("data-webinar-type", webinarType);
        $(".webinartype:gt(" + ($(".webinartype").length - 3) + ")").attr("data-webinar-type", webinarType2);
        $(".webinartype_footer:gt(" + ($(".webinartype_footer").length - 3) + ")").attr("data-webinar-type", webinarType2);
      }
    }).fail(function (t) { });
    setTimeout(function () {
      var webinarTypeLead = $(".webinartype input[type]:checked , .webinartype_footer input[type]:checked").parent().attr("data-webinar-type")
      console.log(webinarTypeLead);
      $('.webinar-lead-type').val(webinarTypeLead);
      var eventName = "SWITCH_UP" == webinarTypeLead ? "Future-proof your career with AI/ ML, Data Science" : "How to Nail your next Technical Interview";
      $('.wr__event_name').val(eventName);
    }, 3000)
  });
  function formatDateTime(date) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yy = date.getFullYear() % 100;
    var hh = date.getHours();
    var min = date.getMinutes();
    var ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    hh = hh ? hh : 12;
    return (mm + "/" + dd + "/" + yy + " " + hh + ":" + (min < 10 ? "0" : "") + min + " " + ampm);
  }
  function validateEmail(emailInput, errorElement) {
    const email = $(emailInput).val();
    if (!emailRegex.test(email)) {
      $(errorElement).removeClass("hide"); return false;
    } else {
      $(errorElement).addClass("hide"); return true;
    }
  }
  function validateName(fullName, errorElement) {
    const name = $(fullName).val();
    if (!name) {
      $(errorElement).removeClass("hide"); return false;
    } else {
      $(errorElement).addClass("hide"); return true;
    }
  }
  function validateLastName(LastName, errorElement) {
    const lastname = $(LastName).val();
    if (!lastname) {
      $(errorElement).removeClass("hide"); return false;
    } else {
      $(errorElement).addClass("hide"); return true;
    }
  }
  function validatePhoneNumber(phoneInput, errorElement) {
    const phoneNumber = $(phoneInput).val();
    if (!PhoneNumberRegex.test(phoneNumber)) {
      $(errorElement).removeClass("hide"); return false;
    }
    else {
      $(errorElement).addClass("hide"); return true;
    }
  }

  $.getJSON("https://api.ipify.org?format=json", function (data) {
    var userIPAddress = data.ip;
    $.getJSON(
      "https://ipinfo.io/" + userIPAddress + "/json",
      function (locationData) {
        var vpnLocation = locationData.city + ", " + locationData.region + ", " + locationData.country;
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (locationData.country == "IN") { $(".country-timezone").text("IST"); } else { $(".country-timezone").text("PST"); }
      }
    );
  });
  function initializeIntlTelInput(id) {
    return window.intlTelInput(document.querySelector(id), {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        $.get("https://get.geojs.io/v1/ip/country.json", function () { },
          "json").always(function (resp) {
            var countryCode = resp && resp.country ? resp.country : "us";
            callback(countryCode);
          });
      },
      hiddenInput: "wq-phone",
      utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
    });
  }

  $("#Email").on("input", function () { validateEmail("#Email", ".email-id-error"); });
  $("#Email-4").on("input", function () { validateEmail("#Email-4", ".email-id-error"); });
  $("#webinar_pnumber2").on("input", function () { validatePhoneNumber("#webinar_pnumber2", ".error-msg-phone"); });
  $("#webinar_pnumber3").on("input", function () { validatePhoneNumber("#webinar_pnumber3", ".error-msg-phone"); });
  $("#firstName").on("input", function () { validateName("#firstName", ".error-msg-name"); });
  $("#Fullname2").on("input", function () { validateName("#Fullname2", ".error-msg-name"); });
  $("#Lastname").on("input", function () { validateLastName("#Lastname", ".error-msg-lastname"); });
  $("#Lastname1").on("input", function () { validateLastName("#Lastname1", ".error-msg-lastname"); });

  var int_phone2; var int_phone3;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const PhoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  int_phone2 = initializeIntlTelInput("#webinar_pnumber2");
  int_phone3 = initializeIntlTelInput("#webinar_pnumber3");
  // submitForm("#wf-form-Webinar-Questions-Form", 'input[name="Email"]', 'input[name="Phone"]', int_phone2, "#Fullname1", "#Lastname");
  submitForm("#register-slotBtnTwo", 'input[name="Email1"]', 'input[name="Phone1"]', int_phone3, "#firstName2", "#Lastname1");
  submitForm("#register-slot-btn", 'input[name="Email"]', 'input[name="Phone"]', int_phone2, "#firstName", "#Lastname");
  submitForm1("#wf-form-Webinar-Questions-Form");
  submitForm1("#wf-form-Webinar-Questions-Form2");
  function submitForm(formSelector, emailSelector, phoneSelector, int_phone, nameSelector, lastnameSelector) {
    $(formSelector).click(function (e) {
      e.preventDefault();
      let isValid = true;
      var currentDate = new Date();
      var formattedDateTime = formatDateTime(currentDate);
      let utmparams = getAllUrlParams();
      let phonewithccode = int_phone.getNumber(intlTelInputUtils.numberFormat.E164);
      isValid = validateName(nameSelector, ".error-msg-name") && isValid;
      isValid = validateLastName(lastnameSelector, ".error-msg-lastname") && isValid;
      isValid = validateEmail(emailSelector, '.email-id-error') && isValid;
      isValid = validatePhoneNumber(phoneSelector, ".error-msg-phone") && isValid;
      $(".wq_question1").val($('input[name="Question1"]:checked').val());
      $(".wq-webinar-slot").val($('input[name="time-slot"]:checked').val());
      $(".wr__event-start-time").val($('input[name="time-slot"]:checked').val());
      $(".wr__event-end-time").val($("input[name='time-slot']:checked").attr("data-endtime"));
      $(".wr__invitee-start-time").val($("input[name='time-slot']:checked").attr("data-invitee_starttime"));
      $(".wr__invitee-end-time").val($("input[name='time-slot']:checked").attr("data-invitee_endtime"));
      $(".wr__fullName").val($(nameSelector).val());
      $(".wr__LastName").val($(lastnameSelector).val());
      $(".wq-email").val($(emailSelector).val());
      $(".wq-phone").val(phonewithccode);
      $(".iksiteurl").val(window.location.href);

      var hiddenInput = $(".wr__invitee-start-time").val() + " - " + $(".wr__invitee-end-time").val();
      localStorage.setItem("hiddenInputValue", hiddenInput);

      if (isValid) {
        var GQLFormData = {
          "First Name": $(".wr__fullName").val(),
          "Last Name": $('.wr__LastName').val(),
          utm_source: $(".utm_source").val(),
          utm_medium: decodeURIComponent(utmparams["utm_medium"]),
          utm_campaign: decodeURIComponent(utmparams["utm_campaign"]),
          gclid: decodeURIComponent(utmparams["gclid"]),
          msclkid: decodeURIComponent(utmparams["msclkid"]),
          fbclid: decodeURIComponent(utmparams["fbclid"]),
          "Event Start Time": $(".wr__event-start-time").val(),
          "Event End Time": $(".wr__event-end-time").val(),
          "Invitee Start Time": $(".wr__invitee-start-time").val(),
          "Invitee End Time": $(".wr__invitee-end-time").val(),
          "Event Name": $('.wr__event_name').val(),
          "How can Interview Kickstart help you today?": $(".wq_question1").val(),
          "WQ Webinar Slot": $(".wq-webinar-slot").val(),
          "Webinar Lead Type": $(".webinar-lead-type").val(),
          Email: $(".wq-email").val(),
          Page_Url: $(".iksiteurl").val(),
          Referrer: $(".wr__referrer").val(),
          cta_page_url: $(".cta_page_url").val(),
          landing_page_url: $(".l_page_url").val(),
          site_url: $(".site_url").val(),
          user_id: visitor_id,
          user_timezone: v_timezone,
          city: $(".wr__city").val(),
          device: $(".wr__device").val(),
          region: $(".wr__region").val(),
          v_country: v_country,
          phone_number_full: $(".wq-phone").val(),
          "Zap Lead create Date": formattedDateTime,
        }
        console.log(GQLFormData);
        $.ajax({
          type: "POST",
          url: "https://hooks.zapier.com/hooks/catch/11068981/3ar9rzk/",
          data: GQLFormData,
          success: function (e) {
            if (e.status == "success") {
              $('.form_next').click();
              $(".confirmed-text").text("Thank you for booking webinar slot");
              // $('form_prev').hide();
              // $(".input_field-block").hide();
              console.log("Form submitted successfully step1!");
            }
          },
        });
      }
    });
  }
  function submitForm1(formSelector) {
    $(formSelector).submit(function (e) {
      e.preventDefault();
      var currentDate = new Date();
      var formattedDateTime = formatDateTime(currentDate);
      let utmparams = getAllUrlParams();
      $(".wq_question2").val($('input[name="Question2"]:checked').val());
      $(".wq_question3").val($('input[name="Question3"]:checked').val());
      var GQLFormData = {
        "First Name": $(".wr__fullName").val(),
        "Last Name": $('.wr__LastName').val(),
        utm_source: $(".utm_source").val(),
        utm_medium: decodeURIComponent(utmparams["utm_medium"]),
        utm_campaign: decodeURIComponent(utmparams["utm_campaign"]),
        gclid: decodeURIComponent(utmparams["gclid"]),
        msclkid: decodeURIComponent(utmparams["msclkid"]),
        fbclid: decodeURIComponent(utmparams["fbclid"]),
        "Event Start Time": $(".wr__event-start-time").val(),
        "Event End Time": $(".wr__event-end-time").val(),
        "Invitee Start Time": $(".wr__invitee-start-time").val(),
        "Invitee End Time": $(".wr__invitee-end-time").val(),
        "Event Name": $('.wr__event_name').val(),
        "How can Interview Kickstart help you today?": $(".wq_question1").val(),
        "What is your current domain?": $(".wq_question2").val(),
        "What is your work experience?": $(".wq_question3").val(),
        "WQ Webinar Slot": $(".wq-webinar-slot").val(),
        "Webinar Lead Type": $(".webinar-lead-type").val(),
        Email: $(".wq-email").val(),
        Page_Url: $(".iksiteurl").val(),
        Referrer: $(".wr__referrer").val(),
        cta_page_url: $(".cta_page_url").val(),
        landing_page_url: $(".l_page_url").val(),
        site_url: $(".site_url").val(),
        user_id: visitor_id,
        user_timezone: v_timezone,
        city: $(".wr__city").val(),
        device: $(".wr__device").val(),
        region: $(".wr__region").val(),
        v_country: v_country,
        phone_number_full: $(".wq-phone").val(),
        "Zap Lead create Date": formattedDateTime,
      };
      console.log(GQLFormData);
      $.ajax({
        type: "POST",
        url: "https://hooks.zapier.com/hooks/catch/11068981/3a89xyb/",
        data: GQLFormData,
        success: function (e) {
          if (e.status == "success") {
            $(".confirmed-text").text("Thank you for booking webinar slot");
            // $('form_prev').hide();
            // $(".input_field-block").hide();
            console.log("Form submitted successfully step2!");
            var salesforce = v_timezone + ":ik.com" + cta_lp + ":ik.com" + getCookie("ik-landingpage-v2");
            var n = visitor_id + ":" + v_country;
            location.href = "https://ikdev.webflow.io/home-new/thank-you" + "?utm_source=" + $(".utm_source").val() + "&assigned_to=Interview Kickstart&invitee_first_name=" + $(".wr__fullName").val() + "&invitee_last_name=" + $(".wr__LastName").val() + "&invitee_email=" + $(".wq-email").val() + "&answer_1=" + $(".wq-phone").val() + "&event_start_time=" + $(".wr__event-start-time").val() + "&event_end_time=" + $(".wr__event-end-time").val() + "&utm_medium=" + n + "&salesforce_uuid=" + salesforce
          }
        },
      });
    });
  }
});