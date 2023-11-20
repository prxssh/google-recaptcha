import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import axios from "axios"

const HomePage = () => {
  const recaptchaRef = useRef(null)
  const [isVerified, setIsVerified] = useState(false)

    async function verifyCaptcha( token ) {
        const res = await axios.post('http://localhost:3001/verify-recaptcha', { token: token })
        if (res.data.success) {
            alert("Captcha Successful!")
            setIsVerified(true)
        } else {
            alert("You're a Robot")
        }
    }

  return (
        <>
          <ReCAPTCHA
            sitekey="6LeGOhUpAAAAAIW15okgzhSC4g3HpiAODWP6sclP"
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
