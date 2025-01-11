export const sendSuccess = (statusCode , message , data, res) => {
    return res.status(statusCode || 200).json({
        message : message || 'Internal Server Error',
        data
    })
}