const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not contain password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


adminSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'owner'
})

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  console.log(admin);
  const token = jwt.sign(
    { _id: admin._id.toString() },
    "online examination system"
  );
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return admin;
};

adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
    console.log(admin.password);
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
