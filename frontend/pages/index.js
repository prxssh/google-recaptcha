export default function Home() {
  return (
    <>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
    <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
  </head>
  <body>
    <form action="" method="POST">
      <div class="g-recaptcha" data-sitekey="6Lfd1xQpAAAAAD0aiI-n8Un4SREu6BczNj7aEVri" data-action="LOGIN"></div>
      <br/>
          <input type="submit" value="Submit"/>
    </form>
  </body>
    </>
  )
}
