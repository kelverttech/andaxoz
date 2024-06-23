<script>
      document.addEventListener("DOMContentLoaded", () => {
        const pageWrapper = ".depositform";
        if (document.querySelector(pageWrapper)) {
          const proxyUrl = "https://anda.lobbybo.com/api/auto-pay";
          const buttonId = "MainContent_btnSubmit_PaymentGateway";
          const wrapperClass = ".form-horizontal";
          let usernameClass = ".labelplayer";
          let amountIdentifier = "MainContent_inputamt_pg";
          let channelIdentifier = "selectbank_pg";
          let username = null;
          let amount = null;
          let uid = null;
          let channel = null;
          document.querySelectorAll(".form-horizontal")[1].innerHTML = "";
          function changeForm() {
            let usernameHTMLElement = document.querySelector(usernameClass);
            if (usernameHTMLElement.length !== 0) {
              username = usernameHTMLElement.textContent;
            }
            username = username.replace(/\s/g, "");

            var page_wrapper = document.querySelectorAll(pageWrapper)[1];
            var actual_wrapper = page_wrapper.querySelector(wrapperClass);
            actual_wrapper.innerHTML += `
                          <div class="form-group form-group-sm">
                              <label class="col-sm-4 control-label">Username</label>
                              <div class="col-sm-8 form-content">
                                  <span class="control-label">kelvertcc</span>
                              </div>
                          </div>
                          <div class="form-group form-group-sm">
                              <label class="col-sm-4 control-label">Uang Sejumlah</label>
                              <div class="col-sm-8">
                                  <input name="ctl00$MainContent$inputamt_pg" type="number" id="MainContent_inputamt_pg" class="form-control" maxlength="11" placeholder="Uang Sejumlah">
                              </div>
                          </div>
                          <div class="form-group form-group-sm">
                              <label class="col-sm-4 control-label">Tujuan</label>
                              <div class="col-sm-8 form-content" style="padding-top:0px;">
                                  <select id="selectbank_pg" class="form-control" required>
                                      <option value="QRIS">QRIS</option>
                                      <option value="DANAQR">DANA</option>
                                      <option value="BCA">BCA</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group form-group-sm" style="text-align: center; margin-top:10px; margin-bottom: 0px;">
                              <input type="submit" name="ctl00$MainContent$btnSubmit_PaymentGateway" value="Kirim" id="MainContent_btnSubmit_PaymentGateway" class="btn btn-primary" style="margin: 0px 15px 10px 15px;">
                          </div>
                          `;
            document
              .getElementById(buttonId)
              .addEventListener("click", function (event) {
                event.preventDefault();
                redirectPayment();
              });
          }

          function redirectPayment() {
            amountHTMLElement = document.getElementById(amountIdentifier);
            amount = amountHTMLElement.value;
            channelHTMLElement = document.getElementById(channelIdentifier);
            channel = channelHTMLElement.value;
            uid = generateUniqueString();
            if (amount == "") {
              alert("Please input nominal");
              return false;
            }

            const url =
              proxyUrl +
              "?mcode=TANDA&sourceId=" +
              username +
              "-" +
              uid +
              "&amount=" +
              amount +
              "&channel=" +
              channel;

            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true); // url should be defined and should be a valid URL

            xhr.onload = function () {
              if (xhr.status === 200) {
                try {
                  const redirectUrl = xhr.response; // Assuming the response is the URL
                  window.open(redirectUrl, "_blank"); // Open the URL in a new tab
                } catch (error) {
                  console.error("Error processing response:", error);
                }
              } else {
                console.error(
                  "Error fetching data:",
                  xhr.status,
                  xhr.statusText
                );
              }
            };

            xhr.onerror = function () {
              console.error("Network Error:", xhr.statusText);
            };

            xhr.send();
          }

          function generateUniqueString() {
            const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
            const randomNum = Math.random().toString(36).substr(2, 5); // Generate a random string
            return timestamp + randomNum; // Combine and return
          }

          function openLinkInNewTab(url) {
            window.open(url, "_blank");
          }

          function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }

          sleep(2000).then(() => {
            changeForm();
          });
        }
      });
    </script>