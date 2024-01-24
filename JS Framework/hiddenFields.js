{*/
<select name="WashEquipment06" id="WashEquipment06" required="" aria-required="true">
    <option selected="" disabled="" value="">Select Wash Equipment</option>
    <option value="Pressure washing" data-target="PressureWasher11">Pressure washing</option>
    <option value="Soft washing" data-target="SoftWashing10">Soft washing</option>
    <option value="Pressure &amp; Soft Washing" data-target="PressureWasher11, SoftWashing10">Pressure &amp; Soft Washing</option>
    <option value="Window Cleaning" data-target="WindowCleaning09">Window Cleaning</option>
</select>
*/}

const inputElements = document.querySelectorAll('[data-target]');

const populateEnabledFieldsets = () => {
    inputElements.forEach((input) => {
        const _targetIds = input.getAttribute('data-target').replace(" ", "").split(",");
        _targetIds.forEach((_id) => {
            const targetElement = document.querySelector(`#${_id}`);
            if (targetElement) {
                if (input.type === 'checkbox' && input.checked) {
                    targetElement.closest('fieldset').disabled = false;
                } else if (input.tagName === 'OPTION' && input.selected) {
                    targetElement.closest('fieldset').disabled = false;
                } else {
                    targetElement.closest('fieldset').disabled = true;
                }
            }
        });
    });
}

populateEnabledFieldsets();

inputElements.forEach((input) => input.addEventListener('change', populateEnabledFieldsets));