<template>
  <div>
    <Title titleValue="About" />
  </div>
</template>

<script>
import Title from "./../components/ui/Title";
// import sgMail from "@sendgrid/mail";

export default {
  components: {
    Title,
  },
  created() {
    //id GtDWKBIdR3iokT8Q6vmxJg
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: "miradofitiavana@gmail.com",
    //   from: "miradofitiavana@gmail.com", // Use the email address or domain you verified above
    //   subject: "Sending with Twilio SendGrid is Fun",
    //   text: "and easy to do anywhere, even with Node.js",
    //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    // };
    // //ES6
    // sgMail.send(msg).then(
    //   () => {},
    //   (error) => {
    //     console.error(error);

    //     if (error.response) {
    //       console.error(error.response.body);
    //     }
    //   }
    // );
    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "miradofitiavana@gmail.com", name: "John Doe" }],
            subject: "Hello, World!",
          },
        ],
        content: [{ type: "text/plain", value: "Heya!" }],
        from: { email: "miradofitiavana@gmail.com", name: "Sam Smith" },
        reply_to: { email: "miradofitiavana@gmail.com", name: "Sam Smith" },
      }),
    });
    // curl --request POST \
    // --url https://api.sendgrid.com/v3/mail/send \
    // --header 'Authorization: Bearer <<YOUR_API_KEY>>' \
    // --header 'Content-Type: application/json' \
    // --data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"miradofitiavana@gmail.com","name":"Sam Smith"},"reply_to":{"email":"miradofitiavana@gmail.com","name":"Sam Smith"}}'
  },
};
</script>

<style lang="scss" scoped>
</style>