// ==UserScript==
// @name        Change Management Heavy Lifter
// @namespace   Violentmonkey Scripts
// @match       https://villanova.teamdynamix.com/TDNext/Apps/2939/Tickets/New*
// @grant       none
// @version     1.0
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @author      -
// @description 11/18/2024, 10:55:56 AM
// ==/UserScript==
function setValues() {
          const processVersion = prompt("Enter the process name and version:");
          processNameParts = processVersion.split('-');
          const processName = processNameParts[0];
          const processEnvironmentNum = prompt("Is this for Cloud(1), Local(2), or Linux HA (3):");
          processEnvironment="";
        switch (processEnvironmentNum) {
          case "1":
              processEnvironment = "Cloud - Production";
              processAtom = "Cloud - Production";
              break;
          case "2":
              processEnvironment = "Production - Local";
              processAtom = "boomiprod1.villanova.edu";
              break;
          case "3":
              processEnvironment = "Production - Local Linux HA";
              processAtom = "Local_Production_Molecule";
              break;
          default:
              alert('Bad environment picked!')
              setTimeout(function(){setValues()}, 1000);
              return false;
        }


  Impact = $('#attribute3953')[0].options[2].selected=true;
  Urgency = $('#attribute3954')[0].options[1].selected=true;
    //RiskOfImplementing = $('#attribute3954')[0].options[1].selected=true;
    //RiskOfNotImplementing = $('#attribute3954')[0].options[1].selected=true;


  ImplementationPlan = $('#attribute129690');
  ImplementationPlan.val(`In Boomi Integration:
1. Click on Deploy
2. Click on Packaged Componenets
3. On "Packaged Components" page:
    3-1. Use search box to locate '${processVersion}'
    3-2. Click on Action icon
    3-3. Click Deploy
4. On "Deploy: Select Environment" window:
    4-1. Select '${processEnvironment}' Deployment Environment
    4-2. Add deployment notes
    4-3. Click "Next: Select Versions"
5. On "Deploy Select Packaged Components" window, click "Next: Review"
6. On "Deploy: Review" window, click "Deploy"
`);

    TestPlan = $('#attribute129691');
  TestPlan.val(`Process can be run manually to confirm it works.

In Boomi Integration:
1. Click "Manage"
2. Click "Process Reporting"
3. On the Executions page, click "Execute Process"
4. On "Execute Process" modal:
    4-1. Select atom on which process was deployed (${processAtom})
    4-2. Click on Process
    4-3. Click on "Filter Processes"
    4-4. Search for process "${processName}"
    4-5. Click on process name
    4-6. Click "Execute"
5. On the "Executions" page, observe the progress of the process as it runs`);



    RollbackPlan = $('#attribute129692');
  RollbackPlan.val(`To rollback process, use Boomi's rollback mechanism.

In Boomi Integration:
1. Click "Deploy"
2. Click "Deployments"
3. On "Deployments" page:
    3-1. Click "Add Filter"
    3-2. Select "Package Veresion"
    3-3. Provide search term "${processVersion}"
    3-4. Click Apply
    3-5. Click on Actions icon next to deployment
    3-6. Click Rollback`);


  CommunicationPlan=$('#attribute129693');
  CommunicationPlan.val(`UNIT work is being communicated directly with the functional owner. The functional owner is coordinating any end-user communication they this is warranted`);
  ProofOfTesting=$('#attribute129694');
  ProofOfTesting.val(`Successful Boomi logs can be copied here to prove the process ran through successfully`);
}


(function () {
    'use strict';

    // Inject a modal into the page
    const modalHTML = `
        <div id="boomiModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 10000; justify-content: center; align-items: center;">
            <div style="background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
                <p>Is this a Boomi request?</p>
                <button id="boomiYes" style="margin-right: 10px;">Yes</button>
                <button id="boomiNo">No</button>
            </div>
        </div>
    `;

    // Append the modal to the body
    $('body').append(modalHTML);

    // Show the modal on page load
    $('#boomiModal').fadeIn();

    $('#boomiYes').on('click', function () {
        // Prompt the user for process name and version
        setTimeout(function(){setValues()}, 1000);
      // Close the modal
        $('#boomiModal').fadeOut();
    });

    $('#boomiNo').on('click', function () {
        $('#boomiModal').fadeOut();
    });
})();

