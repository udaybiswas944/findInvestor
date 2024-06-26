//before the return statement
//define the otp state and take the signupData from the redux store
//if the signupData is not present then redirect the user to the signup page

//in the return statement
//show the otp input and the verify button and the resend otp button
//when the user clicks on the verify button then dispatch the signup function with the signup data and the otp

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../../services/operation/authAPI";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/index";

function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const { signupData, loading } = useSelector((store: RootState) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleVerifyAndSignup = (e: any) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        signUp(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate,
            dispatch
        );
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {loading ? (
                <div>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-gray-800 rounded-[0.5rem] text-gray-100 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-500"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-gray-900"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/signup">
                            <p className="text-gray-100 flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-blue-500 gap-x-2"
                            onClick={() => sendOtp(signupData.email, navigate, dispatch)}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
