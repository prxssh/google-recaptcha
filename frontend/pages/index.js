import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import axios from "axios"

const HomePage = () => {
  const recaptchaRef = useRef(null)
  const [isVerified, setIsVerified] = useState(false)

    async function verifyCaptcha(token) {
        const res = await axios.post('http://recaptcha-test-4rox.vercel.app//verify-recaptcha', { token: token })
        if (res.data.success) {
            setIsVerified(true)
            alert("Captcha Successful!")
        }
    }

  return (
        <>
          <ReCAPTCHA
            sitekey="6LdmRBUpAAAAAEssRNk4qMHxhe3_w-nK58BLUfao"
            ref={recaptchaRef}
            onChange={verifyCaptcha}
          />
          <button type="submit" disabled={!isVerified}>
            Submit feedback
          </button>
        </>
    )
}
export default HomePage
