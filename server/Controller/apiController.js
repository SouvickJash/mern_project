const userModel = require("../Model/apiModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create api
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    //    const {name,email,phone,city,pin}=req.body;
    //    const user=new userModel({
    //     name,email,phone,city,pin
    //    })
    const user = new userModel(req.body); //this is easyest
    const result = await user.save();
    return res.status(201).json({
      status: true,
      message: "Data create fuccessfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      ststus: false,
      message: "error",
    });
  }
};
//get api
const getUser = async (req, res) => {
  try {
    const getData = await userModel.find();
    return res.status(200).json({
      status: true,
      message: "Data fetch sucessfully",
      data: getData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//edit api
const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const editData = await userModel.findById(id);
    return res.status(200).json({
      status: true,
      message: "Data founded",
      data: editData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//update api
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json({
      status: true,
      message: "Data updated successfully",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//delete api
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await userModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Data deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// login api
const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Plz fill up details");
    return res.status(400).json({
      error: "plz fill up your details",
    });
  } else {
    try {
      const user = await userModel.findOne({
        email: email,
      });
      if (user == null) {
        return res.status(404).json({
          error: "Invalid emailid or password",
          status: "404",
        });
      } else {
        const userLogin = await userModel.findOne({
          email: email,
        });

        if (userLogin) {
          const isMatch = await bcrypt.compare(password, userLogin.password); //right

          //create token
          const token = await userLogin.generateAuthToken(); //right
          console.log("The token part" + token);

          res.cookie("jwt", token, {
            //if i want
            expires: new Date(Date.now() + 80000),
            httpOnly: true,
          });

          if (!isMatch) {
            console.log("plz send your correct password");
            return res.status(400).json({
              status: 400,
              error: "Invalid emailid or password",
            });
          } else {
            return res.status(200).json({
              status: 200,
              message: "login successfull",
              info: [userLogin],
              token: token,
            });
          }
        } else {
          return res.status(400).json({
            status: 400,
            error: "Invalid emailid or password",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.log("sucess");
  }
};

// forget password
const forgetPassword = async (req, res) => {
  try {
    console.log(req.body)
    const { city, email, newPassword } = req.body;
    const user = await userModel.findOne({ email, city });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong Email or city name",
      });
    }
    const newHeasedPassword = await bcrypt.hash(newPassword,10);
    await userModel.findByIdAndUpdate(user._id, {
      password: newHeasedPassword,
    });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//update password

module.exports = {
  createUser,
  getUser,
  editUser,
  updateUser,
  deleteUser,
  loginUser,
  forgetPassword,
};
