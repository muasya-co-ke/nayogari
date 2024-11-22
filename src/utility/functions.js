import {ElNotification} from "element-plus";
import Swal from 'sweetalert2';
import store from "@/store/index.js";

export function showSuccess (text)
{
    ElNotification({
        title: 'Success',
        type: "success",
        position: "top-right",
        message: text
    })
}
export function raiseError (text)
{
    ElNotification({
        title: 'Error',
        type: "error",
        position: "top-right",
        message: text
    })
}

export function raiseServerError(err) {
    if (err && err.response && err.response.data) {
        const data = err.response.data;

        // If the response contains a validation error structure
        if (data.type === 'validation_error' && Array.isArray(data.errors) && data.errors.length > 0) {
            data.errors.forEach((error, index) => {
                const message = error.detail || 'An unexpected error occurred';
                const attr = error.attr ? `Field: ${error.attr}` : '';

                setTimeout(() => {
                    ElNotification({
                        title: 'Validation Error', // Set title as 'Validation Error'
                        type: "error",
                        position: "top-right",
                        message: `${attr ? attr + ' - ' : ''}${message}`, // Include the field name in the message
                    });
                }, index * 100); // Stagger notifications slightly
            });
        }
        // If the response comes as a stringified error list
        else if (Array.isArray(data) && data.length > 0) {
            data.forEach((errorStr, index) => {
                let errorMessage = errorStr;

                try {
                    const parsedError = errorStr.replace(/'/g, '"');
                    const errorObj = JSON.parse(parsedError);

                    // Extract the title and message separately
                    const title = errorObj.error || 'Error';  // Use 'error' as the title
                    const message = errorObj.detail || 'An unexpected error occurred'; // Use 'detail' for the message

                    setTimeout(() => {
                        ElNotification({
                            title: title,
                            type: "error",
                            position: "top-right",
                            message: message.replace(/'/g, ''),
                        });
                    }, index * 100); // Stagger notifications slightly
                } catch (e) {
                    console.error('Error parsing the server error response:', e);

                    // Fallback in case parsing fails, remove surrounding curly braces and quotes
                    errorMessage = errorMessage.replace(/[{}']/g, ''); // Removes both curly braces and quotes

                    setTimeout(() => {
                        ElNotification({
                            title: 'Error',  // Set 'Error' as title without quotes
                            type: "error",
                            position: "top-right",
                            message: errorMessage || 'An unexpected error occurred',  // Display the error message without quotes
                        });
                    }, index * 100);
                }
            });
        }
        // If there is a single error message in the response
        else if (data.message) {
            ElNotification({
                title: 'Error',  // Set 'Error' as title without quotes
                type: "error",
                position: "top-right",
                message: data.message.replace(/'/g, '') || 'An unexpected error occurred',  // Display the error message without quotes
            });
        }
        // Catch any unhandled or unexpected errors
        else {
            ElNotification({
                title: 'Error',  // Set 'Error' as title without quotes
                type: "error",
                position: "top-right",
                message: 'An unexpected error occurred',
            });
        }
    } else {
        // Fallback for network errors or other issues not directly related to the response data
        ElNotification({
            title: 'Error',  // Set 'Error' as title without quotes
            type: "error",
            position: "top-right",
            message: err.message || 'An unexpected error occurred',
        });
    }
}

export function formatDate(dateString) {
    if (!dateString) return '';

    // Convert the date string to a Date object
    const date = new Date(dateString);

    // Check if the date conversion is valid
    if (isNaN(date)) return '';

    // Options for formatting the date
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    // Check if the time portion is present
    const hasTime = dateString.includes('T') || dateString.includes(':');

    if (hasTime) {
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }

    // Return the formatted date without time
    return date.toLocaleDateString(undefined, dateOptions);
}


export function deleteLocalStorageInformation(){
    localStorage.removeItem("authData")
    localStorage.removeItem("userDetails")
    localStorage.removeItem("rentalDetails")
}






export default {}