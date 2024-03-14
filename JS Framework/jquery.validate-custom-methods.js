// update the JQuery validate email rule to require a TLD
$.validator.methods.email = function (value, element) {
    return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(value);
};

// JQuery validate rule to determine if file uploaded is larger than allowed.
// Argument 0 is the limit in bytes, argument 1 is the limit in megabytes (used for validation message).
$.validator.addMethod("maxfilesize", function (value, element, arg) {
    if (this.optional(element) || !element.files || !element.files[0]) {
        return true;
    } else {
        for (var i = 0; i < element.files.length; i++) {
            if (element.files[i].size > arg[0]) {
                return false;
            }
        }
        return true;
    }
}, "Please select a file less than {1} megabytes.");
