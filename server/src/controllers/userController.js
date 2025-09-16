
export const listAllUsers = async (req,res)=>{
try {
    res.send('users')
} catch (error) {
    console.log(error);
}
}