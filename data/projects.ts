import type { Project } from "@/types/content";
import ecommerceOrderDiagram from "@/public/images/projects/ecommerce-order-diagram.png";
import ecommerceOrderTerminal from "@/public/images/projects/ecommerce-order-terminal.png";
import ecommerceOrderSqs from "@/public/images/projects/ecommerce-order-sqs.png";
import ecommerceOrderLambda from "@/public/images/projects/ecommerce-order-lambda.png";
import ecommerceOrderCloudwatchLog from "@/public/images/projects/ecommerce-order-cloudwatch-log.png";
import ecommerceOrderLambdaMetrics from "@/public/images/projects/ecommerce-order-lambda-metrics.png";
import ecommerceOrderSqsMonitoring from "@/public/images/projects/ecommerce-order-sqs-monitoring.png";
import ecommerceOrderDlq from "@/public/images/projects/ecommerce-order-dlq.png";
import ecommerceOrderDlqMonitoring from "@/public/images/projects/ecommerce-order-dlq-monitoring.png";
import peopledeskArchitecture from "@/public/images/projects/peopledesk-architecture.png";
import sipBuckets from "@/public/images/projects/sip-buckets.png";
import sipResults from "@/public/images/projects/sip-results.png";

const ecommerceDiagram = {
  src: ecommerceOrderDiagram,
  alt: "Order reliability architecture: local producer scripts send to an SQS order queue, Lambda processes the batch, SNS publishes accepted orders, failed messages move to a dead-letter queue after three receives, and CloudWatch Logs records the outcome.",
  caption: "Local scripts stand in for checkout. SQS buffers the order, one Lambda validates and notifies, and a dead-letter queue isolates a message that still fails after three attempts.",
};

const ecommerceScreenshots = [
  {
    src: ecommerceOrderTerminal,
    alt: "Terminal output from the producer scripts: the end of a 500-order run, then a failed order accepted into the queue with an SQS message ID.",
    caption: "SQS returns a message ID only after it accepts the message. The 500-order burst and the simulated failure both end at the queue, not inside the producer request.",
  },
  {
    src: ecommerceOrderSqs,
    alt: "Amazon SQS console for the standard order queue in eu-central-1, with SQS-managed encryption, four-day retention, a 60-second visibility timeout, and a dead-letter queue enabled.",
    caption: "Order queue after Lambda had already deleted the successful messages. Visible count is zero because processing kept up with the script.",
  },
  {
    src: ecommerceOrderLambda,
    alt: "Lambda function overview with an enabled SQS event source mapping on the order queue.",
    caption: "The only consumer of the order queue is this function. The mapping is enabled; the dead-letter queue has no trigger.",
  },
  {
    src: ecommerceOrderCloudwatchLog,
    alt: "CloudWatch Logs stream with JSON lines for accepted orders, each including the order ID and SQS message ID, and no customer email.",
    caption: "One accepted log line per processed message. Invocations in this stream finished in about 16–25 ms.",
  },
  {
    src: ecommerceOrderLambdaMetrics,
    alt: "Lambda Monitor tab showing 509 invocations, 100 percent success, zero throttles, a peak of 5 concurrent executions, and Errors at zero.",
    caption: "Errors stayed at zero during the deliberate failure because the function returned it as a partial batch item failure. Proof of failure is the log line and the dead-letter queue.",
  },
  {
    src: ecommerceOrderSqsMonitoring,
    alt: "SQS monitoring for the order queue during the 500-order burst: sent, received, and deleted counts spike together while visible messages stay near zero and oldest-message age reaches about 2.7 minutes.",
    caption: "A backlog of visible messages never formed because Lambda kept up with the producer. Age of the oldest message still moved, so orders were buffered and then drained.",
  },
  {
    src: ecommerceOrderDlq,
    alt: "Dead-letter queue configuration: 14-day retention, redrive allowed only from the source queue, and no Lambda trigger.",
    caption: "Nothing consumes the dead-letter queue automatically. Recovery is an operator action after the cause is fixed.",
  },
  {
    src: ecommerceOrderDlqMonitoring,
    alt: "Dead-letter queue monitoring after the simulated failure: visible messages rise to 1 and age climbs, while received and deleted counts stay at zero.",
    caption: "The poison message sat in the dead-letter queue. Nobody automatically put it back into processing.",
  },
];

const peopledeskDiagram = {
  src: peopledeskArchitecture,
  alt: "PeopleDesk AWS architecture: users reach an Application Load Balancer in a VPC spanning eu-central-1a and eu-central-1b. Each zone has a public subnet with a NAT gateway and a private subnet with an EC2 instance from a shared Auto Scaling group and an Aurora MySQL instance, with Multi-AZ recovery between the two database instances.",
  caption: "Two Availability Zones in eu-central-1, with one NAT gateway per zone and the application and database tiers in private subnets.",
};

const sipBucketDiagram = {
  src: sipBuckets,
  alt: "AWS console in eu-central-1 showing three S3 buckets: sip-input-a7k2, sip-output-a7k2, and sip-web-a7k2. Input and output stay private; the website bucket is separate.",
  caption: "Three buckets in eu-central-1. Input and output block public access. The website bucket hosts only the static page.",
};

const sipResultsImage = {
  src: sipResults,
  alt: "The static site after processing: a 272 KB JPEG became a 300 by 200 thumbnail at 14.6 KB and a 960 by 640 WebP at 155 KB, with the output object keys shown on the page.",
  caption: "Both renditions returned to the page. Output keys are derived from the upload name, so the client never lists the bucket.",
};

export const projects: Project[] = [
  {
    slug: "ecommerce-order-reliability",
    title: "E-Commerce Order Reliability on AWS",
    summary:
      "A Terraform-defined SQS, Lambda, and SNS pipeline that accepts orders when notification is slow, retries temporary failures, and isolates a poison message in a dead-letter queue after three attempts.",
    kind: "Case study",
    featured: true,
    tags: ["AWS", "Terraform", "SQS", "Lambda", "SNS", "IAM", "CloudWatch"],
    coverImage: ecommerceDiagram,
    diagram: ecommerceDiagram,
    screenshots: ecommerceScreenshots,
    repositoryUrl: "https://github.com/ayberkgerey/eCommerce-order-reliability",
    stack: [
      { name: "Amazon SQS Standard", purpose: "Durable order buffer. Producers finish when SQS accepts the JSON; processing happens later" },
      { name: "SQS dead-letter queue", purpose: "Holds a message after three failed receives for 14 days. No consumer, so recovery is deliberate" },
      { name: "AWS Lambda order-processor", purpose: "Node.js 22 function: validate one order, publish to SNS, report only failed records in the batch" },
      { name: "Amazon SNS", purpose: "Announces an order that already passed validation. Email is off unless `sns_email_endpoint` is set" },
      { name: "CloudWatch Logs", purpose: "JSON lines with order ID, message ID, and result. Retention 14 days. No alarms, because there is no on-call destination" },
      { name: "IAM execution role", purpose: "Consume the order queue, publish to the topic, write this function's logs. Cannot read the dead-letter queue" },
      { name: "Terraform", purpose: "Defines the queue, DLQ, Lambda, SNS, IAM, and log group in `eu-central-1`. State and tfvars stay off git" },
      { name: "Local producer scripts", purpose: "Stand in for checkout. `sqs:SendMessage` only, credentials from the AWS CLI chain, no keys in the repo" },
    ],
    sections: {
      overview: [
        {
          type: "paragraph",
          text: "An e-commerce company should still accept orders when notification or warehouse handling is slow. This lab replaces a synchronous order flow with a small asynchronous pipeline: SQS buffers the order, one Lambda function processes it, SNS announces the accepted order, and a dead-letter queue isolates a message that still fails after three attempts.",
        },
        {
          type: "paragraph",
          text: "The stack is defined in Terraform and deployed in `eu-central-1`. There is no checkout UI, payment gateway, or warehouse system. The producer is a local script, which is enough to show the reliability behavior under a normal load, a 500-order burst, and a deliberate processing failure.",
        },
      ],
      problem: [
        {
          type: "paragraph",
          text: "During a short, high-traffic event such as Black Friday, order intake, customer notification, and warehouse handoff often run inside one request. Those steps succeed or fail together. A timeout in a downstream system fails an order the business could have accepted and finished later, the spike reaches every dependency at once, and a poison message is retried in the same path as healthy orders.",
        },
        {
          type: "table",
          columns: ["Need", "How the lab shows it"],
          rows: [
            ["Intake survives a downstream failure", "SQS accepts the message before Lambda publishes. The producer does not wait for SNS"],
            ["A burst waits in a buffer", "500 orders are sent one at a time; the queue absorbs them while the function catches up"],
            ["Temporary failures retry without a person", "Visibility timeout 60 seconds, maximum receive count 3"],
            ["Permanent failures leave the main queue", "After three receives, SQS moves the message to a dead-letter queue with no consumer"],
            ["Operators can see backlog and failures", "Queue depth, oldest-message age, and JSON logs. Lambda `Errors` is not the proof of a caught failure"],
          ],
        },
        {
          type: "paragraph",
          text: "The requirement is narrower than a full commerce platform. The function validates the order and publishes a notification. That is enough to show buffering, asynchronous processing, partial batch failure, retries, a dead-letter queue, and operational visibility.",
        },
      ],
      architecture: [
        {
          type: "paragraph",
          text: "The local scripts stand in for the checkout service. They only need `sqs:SendMessage`. After SQS stores the JSON order, an event source mapping invokes the order processor with a batch of up to 10 messages. A valid order is published to SNS with the order ID, product, quantity, amount, and status `ACCEPTED`. The published message does not contain the customer email.",
        },
        {
          type: "heading",
          text: "Path of a healthy order",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "`scripts/send-orders.js` calls `SendMessage` on the standard order queue. The script's job ends when SQS accepts the message.",
            "The queue stores the message for up to four days. Other producers can continue to send while processing catches up.",
            "The event source mapping invokes the function with up to 10 messages.",
            "For each record the function parses the body, validates the fields, and publishes one SNS message.",
            "The function returns no failure identifier for that record. Lambda deletes it from the queue.",
            "CloudWatch Logs receives one JSON line with the order ID, the SQS message ID, and `result: accepted`.",
          ],
        },
        {
          type: "heading",
          text: "Path of a failed order",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "`scripts/send-failed-order.js` sends the same shape with `simulateFailure` set to `true`. An invalid body fails in the same way.",
            "The function catches the error for that record only. Other records in the batch are still processed.",
            "The return value lists that SQS message ID in `batchItemFailures`.",
            "Lambda deletes the successful records and makes the failed record visible again after the 60-second visibility timeout.",
            "After three failed receives, SQS moves the message to the dead-letter queue, which keeps it for 14 days.",
            "Nothing consumes that queue automatically. An operator inspects it and, once the cause is fixed, redrives it or deletes a pure test message.",
          ],
        },
        {
          type: "heading",
          text: "Order message",
        },
        {
          type: "code",
          language: "json",
          caption: "Producer body. simulateFailure is a lab switch; production traffic should not use it",
          code: `{
  "orderId": "ORD-1001",
  "customerEmail": "customer@example.com",
  "product": "Laptop",
  "quantity": 1,
  "amount": 1200,
  "simulateFailure": false
}`,
        },
        {
          type: "heading",
          text: "Operational defaults",
        },
        {
          type: "table",
          columns: ["Setting", "Value"],
          rows: [
            ["Region", "`eu-central-1`"],
            ["Lambda runtime", "Node.js 22, 256 MB, 10-second timeout"],
            ["Visibility timeout", "60 seconds"],
            ["Batch size", "10, with `ReportBatchItemFailures`"],
            ["Maximum receive count", "3"],
            ["Main queue retention", "4 days, SQS-managed SSE"],
            ["Dead-letter retention", "14 days, no consumer"],
            ["Log retention", "14 days"],
            ["Email subscription", "Off unless `sns_email_endpoint` is set"],
          ],
        },
        {
          type: "paragraph",
          text: "The queue is a standard queue, not FIFO. SQS Standard can deliver a message more than once. The function does not remember that it has already published a notification for an order ID. A timeout after a successful `Publish` can therefore send a second notification. Exactly-once processing would need a durable idempotency record; this project documents that requirement and does not pretend the queue provides it.",
        },
      ],
      implementation: [
        {
          type: "paragraph",
          text: "Terraform creates the queues, IAM role, Lambda, SNS topic, and log group. Resource names default to `ecommerce-order-dev`. The Lambda log group is created in Terraform at `/aws/lambda/<function-name>` so the function does not need permission to create log groups. The deployment package is only `index.js`; the Node.js 22 runtime already includes AWS SDK for JavaScript v3.",
        },
        {
          type: "paragraph",
          text: "The handler reports a failed order inside a successful invocation. Lambda's `Errors` metric therefore stays at zero for the simulated failure. The proof of failure is the log line and the dead-letter queue, not the Lambda error count.",
        },
        {
          type: "code",
          language: "javascript",
          caption: "src/order-processor/index.js: retry only the failed records in the batch",
          code: `exports.handler = async (event) => {
  const batchItemFailures = [];

  for (const record of event.Records ?? []) {
    try {
      await processRecord(record);
    } catch (error) {
      console.error(
        JSON.stringify({
          messageId: record.messageId,
          result: "failed",
          error: error instanceof Error ? error.message : "Unknown processing error",
        }),
      );
      if (record.messageId) {
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }
  }

  return { batchItemFailures };
};`,
        },
        {
          type: "paragraph",
          text: "`terraform.tfvars` and local state are gitignored. After `terraform init`, `.terraform.lock.hcl` is committed so provider versions are pinned without storing account data. Destroy deletes the queues and any messages still in them. The 500-order run stays far inside the Lambda, SQS, and SNS free tiers. There is no EC2, RDS, NAT Gateway, API Gateway, customer-managed KMS key, or CloudWatch alarm.",
        },
      ],
      decisions: [
        {
          type: "heading",
          text: "Asynchronous and decoupled, not a longer request",
        },
        {
          type: "paragraph",
          text: "A synchronous call chain has one advantage: the caller learns the final result before the request ends. The slowest dependency then sets throughput, and a single timeout becomes a failed order. Here the producer is finished when SQS accepts the message. The customer does not get a synchronous \"notification sent\" response, and a standard queue can deliver the same message more than once. For a sale event, keeping the order and isolating the failure matter more than answering every downstream step in the original request.",
        },
        {
          type: "heading",
          text: "SQS Standard instead of FIFO",
        },
        {
          type: "paragraph",
          text: "FIFO adds ordering and a deduplication window, with lower throughput. This problem is spike absorption and failure isolation, not strict per-customer ordering. FIFO deduplication also would not make the SNS publish exactly-once: if the function publishes and crashes before deleting the message, SQS delivers that same message again. The standard queue makes at-least-once behavior obvious.",
        },
        {
          type: "heading",
          text: "Dead-letter queue, max receive count 3",
        },
        {
          type: "paragraph",
          text: "Three receives cover a short processing error. The 60-second visibility timeout spreads those attempts over a few minutes instead of a tight loop. Fourteen days on the dead-letter queue gives an operator time to inspect. An automatic consumer on that queue would put poison messages back into processing.",
        },
        {
          type: "heading",
          text: "One Lambda function and partial batch response",
        },
        {
          type: "paragraph",
          text: "The business step is validation plus one notification. A second function, a second queue, or Step Functions would add moving parts without a second business system to protect. Failing the whole ten-message invocation would retry the good orders and could publish them again. `ReportBatchItemFailures` retries only the failed message. The function is not in a VPC, so there is no NAT Gateway.",
        },
        {
          type: "heading",
          text: "SNS instead of another queue",
        },
        {
          type: "paragraph",
          text: "A queue implies another worker and another retry policy. The notification is a fact about an order that already passed validation. EventBridge would fit if many products had to filter a wide event bus; this lab has one producer of one event type.",
        },
        {
          type: "heading",
          text: "Idempotency documented, not built",
        },
        {
          type: "paragraph",
          text: "A production processor would record the order ID in a durable store before treating the notification as final. DynamoDB is the usual AWS tool for that. Leaving the table out keeps the remaining gap explicit: this pipeline can emit two notifications for one order. A half-built lock would look like exactly-once processing.",
        },
      ],
      testing: [
        {
          type: "paragraph",
          text: "The commands sent 10 valid orders, then 500, then one order with `simulateFailure` set to `true`. SQS Standard can deliver a message more than once, so two notifications for one order is not a failed test.",
        },
        {
          type: "table",
          columns: ["Scenario", "Command", "What the run showed"],
          rows: [
            ["A — normal processing", "`node send-orders.js 10`", "One `accepted` log line per message; main queue returned to about zero visible messages; dead-letter queue stayed empty"],
            ["B — traffic spike", "`node send-orders.js 500`", "Lambda 509 invocations, 100% success, zero throttles, peak concurrency 5, average duration about 100 ms. Visible-message graph stayed near zero; oldest-message age still moved to about 2.7 minutes"],
            ["C — processing failure", "`node send-failed-order.js`", "Script still reported `submitted`. After three receives the message sat in `ecommerce-order-dev-order-dlq`. Lambda `Errors` stayed at zero"],
            ["D — recovery", "Inspect, then delete or redrive", "A managed redrive copies the body unchanged. Redriving while `simulateFailure` is still `true` fails three more times. Delete a lab message after inspection"],
          ],
        },
        {
          type: "paragraph",
          text: "`NumberOfEmptyReceives` climbs while the queue is idle because the event source mapping polls SQS even when there is nothing to process. An empty receive is not a failed order. The producer sends orders one at a time, and each order takes only a few tens of milliseconds, so Lambda kept up with the script. A backlog of visible messages appears when the producer is faster than the consumer; here the useful evidence is that sent, received, and deleted counts spiked together.",
        },
      ],
      security: [
        {
          type: "list",
          items: [
            "The function assumes `ecommerce-order-dev-order-processor`. No access key is stored in source, Lambda environment variables, or Terraform.",
            "The inline policy is three statements: consume the order queue, publish to the topic, write this function's log group. Queue consumption and notification are separate so a change to one does not widen the other.",
            "The role cannot read or delete dead-letter messages. Redrive uses the operator's credentials.",
            "The queue, dead-letter queue, and topic are private to the account. There is no public queue policy and no `Principal: \"*\"`.",
            "Orders are encrypted at rest with SQS-managed encryption, not a customer-managed KMS key.",
            "The function does not log the customer email or the raw message body. SNS also omits the email. The address is still validated so a broken payload is rejected.",
            "`simulateFailure` is a lab control on the message body. Anyone who can send to the queue can set it. It is not authorization, and it should be removed before the function processes real orders.",
          ],
        },
        {
          type: "paragraph",
          text: "Terraform state is local. The state file can contain resource identifiers and, if set, the notification email. It is gitignored. `.terraform.lock.hcl` pins provider versions and does not contain account data.",
        },
      ],
      lessons: [
        {
          type: "list",
          items: [
            "Acceptance and processing are different steps. SQS can return a message ID for an order the function will later reject.",
            "A caught failure is not a Lambda error. Use the log line and the dead-letter queue, not `Errors`, as the proof.",
            "SQS Standard is at-least-once. A successful SNS publish followed by a timeout can process the same order again.",
            "FIFO would not have made the notification exactly-once, and it would have hidden the lesson this lab is meant to show.",
            "An empty receive is polling, not a failed order.",
            "Recovery is an operation, not another piece of the platform. No extra queue or function was added for redrive.",
          ],
        },
      ],
      future: [
        {
          type: "list",
          items: [
            "A DynamoDB idempotency record written before the notification is treated as final.",
            "Pin `@aws-sdk/client-sns` inside the deployment package so a runtime update cannot change the SDK on the host.",
            "Maximum event-source concurrency if a later version called a warehouse or payment API.",
            "CloudWatch alarms once there is an on-call destination.",
            "Remove `simulateFailure` before the function processes real orders.",
          ],
        },
      ],
    },
  },
  {
    slug: "serverless-image-processing",
    title: "Serverless Image Processing on AWS",
    summary:
      "A static page uploads a JPEG, PNG, or WebP to S3. One Lambda function writes a thumbnail and a smaller WebP rendition to a second bucket. There is no application server, and the browser never holds a long-lived AWS key.",
    kind: "Case study",
    featured: true,
    tags: ["AWS", "S3", "Lambda", "Cognito", "IAM", "Sharp", "CloudWatch"],
    coverImage: sipResultsImage,
    screenshots: [sipResultsImage, sipBucketDiagram],
    repositoryUrl: "https://github.com/ayberkgerey/serverless-image-processing",
    stack: [
      { name: "S3 input bucket", purpose: "Private originals under `uploads/`. Object Created on that prefix is the only event that starts work" },
      { name: "S3 output bucket", purpose: "Private `thumbnails/` and `optimized/` objects, with no event notification, so results cannot re-enter the function" },
      { name: "S3 website bucket", purpose: "Static hosting for the page, stylesheet, and client. Public read is limited to those files" },
      { name: "Lambda process-image", purpose: "One Node.js function on arm64: download one object, write two WebP renditions, log the outcome" },
      { name: "Sharp", purpose: "Thumbnail inside 300×300, optimized width 1200 px, WebP quality 80, EXIF rotation before resize" },
      { name: "Cognito identity pool", purpose: "Guest identities that exchange for short-lived credentials. No access key in JavaScript" },
      { name: "IAM", purpose: "Separate roles for the function and the browser, each limited to the prefixes they actually touch" },
      { name: "CloudWatch Logs", purpose: "Function logs kept for 7 days: key, error name, duration, and memory" },
    ],
    sections: {
      overview: [
        {
          type: "paragraph",
          text: "This project is about the part of cloud work that happens after the feature is written: how a request is trusted, where data is allowed to live, what runs only when there is work, and what that costs when nobody is using it.",
        },
        {
          type: "paragraph",
          text: "A static page in eu-central-1 accepts a JPEG, PNG, or WebP image. The original lands in `sip-input-a7k2`. The function `process-image` writes a thumbnail and a smaller WebP file to `sip-output-a7k2`. The page waits for those two objects and shows them. There is no application server. Account identifiers in the source screenshots are masked.",
        },
      ],
      problem: [
        {
          type: "table",
          columns: ["Boundary", "How it is visible"],
          rows: [
            ["Write vs read", "The page can put an original into one prefix and read only the two result prefixes"],
            ["Function vs website", "The function can read originals and write results. It cannot list either bucket or read the website"],
            ["Public vs private", "The website can be read by anyone. The images cannot"],
            ["Idle cost", "Processing starts because an object arrived and stops when that object is done"],
            ["No database", "Output names are derived from the input name, so the page can find results without listing the bucket"],
          ],
        },
      ],
      architecture: [
        {
          type: "paragraph",
          text: "The website lives in a third bucket because the input and output buckets block public access. Mixing a public HTML read with private images would weaken the image buckets.",
        },
        {
          type: "heading",
          text: "Request path",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Visitor chooses an image on the S3 website.",
            "The page asks a Cognito identity pool for guest credentials and receives temporary credentials.",
            "The page PUTs `uploads/{id}-{name}.ext` to the input bucket.",
            "S3 ObjectCreated on `uploads/` invokes `process-image`.",
            "Lambda GetObject, Sharp (two WebP renditions), PutObject to `thumbnails/` and `optimized/`.",
            "The page HeadObject-polls both keys, then GetObject, and shows preview and download.",
          ],
        },
        {
          type: "heading",
          text: "Object key contract",
        },
        {
          type: "paragraph",
          text: "An upload such as `uploads/2f1e9c0a-…-harbor.jpg` becomes `thumbnails/2f1e9c0a-…-harbor.webp` and `optimized/2f1e9c0a-…-harbor.webp`. The page and the function share that rule. The page never calls `ListBucket`.",
        },
        {
          type: "paragraph",
          text: "The id comes from `crypto.getRandomValues` because S3 website endpoints are HTTP, and `crypto.randomUUID` is only available in a secure context.",
        },
        {
          type: "heading",
          text: "What this design leaves out",
        },
        {
          type: "paragraph",
          text: "API Gateway, a second Lambda, DynamoDB, and an application server are unnecessary for this flow. Job status is the presence of the two output objects. A presigned-URL API would also be sound, but it needs an extra function and API Gateway, so it is outside this project's boundary. Nothing in the repository creates AWS resources; they were created in the console.",
        },
      ],
      implementation: [
        {
          type: "paragraph",
          text: "The function is Node.js 26.x on arm64, packaged as a Zip. The handler is `index.handler`. `OUTPUT_BUCKET` is `sip-output-a7k2`. Sharp is installed for Linux arm64 at package time so the Lambda binary is not a macOS build.",
        },
        {
          type: "paragraph",
          text: "JPEG, PNG, and WebP only. Aspect ratio is preserved. `rotate()` runs before resize so phone photos are not saved on their side. Input is capped at 100 million pixels. A corrupt file becomes `InvalidImageError` and is not retried. An S3 or SDK failure is rethrown so Lambda can retry it. If the event bucket is the output bucket, the record is ignored.",
        },
        {
          type: "code",
          language: "javascript",
          caption: "lambda/index.js: output keys shared with the page",
          code: `export function outputKeys(sourceKey) {
  const fileName = sourceKey.split("/").pop() || "image";
  const dot = fileName.lastIndexOf(".");
  const base = (dot === -1 ? fileName : fileName.slice(0, dot)) || "image";
  return {
    thumbnailKey: \`thumbnails/\${base}.webp\`,
    optimizedKey: \`optimized/\${base}.webp\`,
  };
}`,
        },
        {
          type: "table",
          columns: ["Setting", "Deployed value"],
          rows: [
            ["Memory", "128 MB (a logged run finished in 456 ms and used 118 MB)"],
            ["Timeout", "30 seconds"],
            ["Architecture", "arm64"],
            ["Trigger", "Object Created on `sip-input-a7k2`, prefix `uploads/`, suffixes `.jpg`, `.jpeg`, `.png`, `.webp`"],
          ],
        },
        {
          type: "paragraph",
          text: "The page rejects non-images and files over 10 MB before it asks Cognito for credentials. While it waits, `HeadObject` returning 403 or 404 means not ready: the guest role has no `ListBucket`, and S3 uses those statuses for a missing object when listing is denied. Polling lasts up to 60 seconds.",
        },
      ],
      decisions: [
        {
          type: "heading",
          text: "Two image buckets, not one",
        },
        {
          type: "paragraph",
          text: "Splitting input from output is what makes the pipeline terminate. The output bucket has no event notification, and the function also ignores events whose bucket is the output bucket so a later console change cannot create a loop.",
        },
        {
          type: "heading",
          text: "Cognito guests instead of keys in JavaScript",
        },
        {
          type: "paragraph",
          text: "IAM access keys in the page were rejected. A public `PutObject` bucket policy was rejected. API Gateway plus a second Lambda for presigned URLs is a sound design when an API already exists; this project does not add that surface. The identity pool id in the frontend is an identifier, not an access key.",
        },
        {
          type: "heading",
          text: "Deterministic keys instead of a status table",
        },
        {
          type: "paragraph",
          text: "The page chooses the key before the upload. Lambda derives the output keys from that same base name. The guest role never needs `s3:ListBucket`.",
        },
        {
          type: "heading",
          text: "Website bucket kept off the data path",
        },
        {
          type: "paragraph",
          text: "Static hosting needs a public read of HTML, CSS, and JavaScript only. That policy never applies to the originals or the renditions.",
        },
      ],
      testing: [
        {
          type: "paragraph",
          text: "Image transforms are checked locally with Sharp before anything is deployed. A 1600×900 image becomes a 300×169 thumbnail and a 1200×675 optimized image. A 200×100 image stays 200×100. A 900×1600 image becomes a 169×300 thumbnail, and the optimized copy stays 900 px wide because that is already under 1200 px. Invalid bytes are rejected.",
        },
        {
          type: "table",
          columns: ["Check", "Expected"],
          rows: [
            ["JPEG, PNG, and WebP through the site", "Progress, then both WebP downloads; matching objects in input `uploads/` and output `thumbnails/` and `optimized/`"],
            ["PDF or a text file renamed to `.jpg` via the CLI", "Function logs `InvalidImageError` or skipped file type; no retry loop"],
            ["Empty Lambda test event `{}`", "Zero records, invocation succeeds"],
            ["Put a file in the output bucket", "Lambda does not run"],
            ["Wrong website origin in input CORS", "Browser blocks the upload"],
          ],
        },
        {
          type: "paragraph",
          text: "The README screenshot of a successful page run: a 272 KB JPEG became a 300×200 thumbnail at 14.6 KB and a 960×640 WebP at 155 KB.",
        },
      ],
      security: [
        {
          type: "list",
          items: [
            "Input and output buckets block public access. Their bucket policies are empty. Encryption is SSE-S3. Object Ownership is bucket owner enforced so Lambda can read an object uploaded by the guest role.",
            "The guest role can `PutObject` on `uploads/*` and `GetObject` on `thumbnails/*` and `optimized/*`. It cannot list a bucket, read originals, or write the output prefixes.",
            "The function role can `GetObject` on `uploads/*` and `PutObject` on the two output prefixes, plus log writes. Neither role can list a bucket.",
            "CORS on the input and output buckets is for the website origin. A request that passes CORS still has to pass IAM.",
            "Sharp re-encodes every result, so camera location and device tags are not copied into the output bucket.",
            "Originals expire after 1 day. Results expire after 7 days. Log retention is 7 days.",
          ],
        },
        {
          type: "paragraph",
          text: "A visitor who opens the site can upload an image and read the renditions this pipeline writes. They cannot read another visitor's original. Guessing another visitor's processed key is not practical; someone who already knows a key can read that processed image. The 10 MB check runs in the browser, so it is a usability limit, not an IAM boundary.",
        },
      ],
      lessons: [
        {
          type: "list",
          items: [
            "A cloud design is a set of boundaries, not a list of services.",
            "The upload succeeding and the processing starting are the same fact when Object Created is the trigger.",
            "When listing is denied, S3 answers 403 for a missing key, not 404. The page has to treat both as not ready.",
            "The PutObject signature must cover `content-type` if the upload request sends that header.",
            "Lambda on arm64 needs the Linux Sharp binary, not the one from a laptop `npm install`.",
          ],
        },
      ],
      future: [
        {
          type: "list",
          items: [
            "Infrastructure as Code. Resources are created in the console today.",
            "A Cognito user pool in front of the same identity pool if the demo must require a signed-in user, still without API Gateway.",
            "Optional reserved concurrency on `process-image` as a hard cap on parallel encodes.",
            "An AWS Budget alert on the account.",
          ],
        },
      ],
    },
  },
  {
    slug: "peopledesk-high-availability-aws",
    title: "PeopleDesk: Highly Available Employee Management on AWS",
    summary:
      "A stateless Node.js application deployed across two Availability Zones behind an Application Load Balancer, running on an EC2 Auto Scaling group and backed by an Aurora MySQL cluster, with tested instance and database failover.",
    kind: "Case study",
    featured: true,
    tags: ["AWS", "VPC", "ALB", "EC2 Auto Scaling", "Aurora MySQL", "Secrets Manager", "IAM"],
    coverImage: peopledeskDiagram,
    diagram: peopledeskDiagram,
    repositoryUrl: "https://github.com/ayberkgerey/high-availability-em",
    stack: [
      { name: "Amazon VPC", purpose: "Isolated network (10.0.0.0/16) with two public and two private subnets across two Availability Zones" },
      { name: "Application Load Balancer", purpose: "Single public entry point on HTTP :80, forwarding to the target group on port 3000" },
      { name: "EC2 Auto Scaling", purpose: "Keeps the desired number of application instances across both private subnets and replaces failed ones" },
      { name: "NAT Gateway (x2)", purpose: "Outbound-only internet access for private instances, one per Availability Zone" },
      { name: "Aurora MySQL", purpose: "Cluster with a writer and a reader in different zones; the reader is the failover target" },
      { name: "Secrets Manager", purpose: "Stores database credentials and the endpoint outside code, AMIs, and user data" },
      { name: "IAM instance role", purpose: "Temporary credentials for the AWS SDK, with no access keys on the servers" },
      { name: "Systems Manager Session Manager", purpose: "Shell access to private instances without SSH keys or an open port 22" },
      { name: "Node.js 20 and Express 4", purpose: "Stateless REST API and static frontend served from one process per instance" },
    ],
    sections: {
      overview: [
        {
          type: "paragraph",
          text: "PeopleDesk is an HR web application for managing employees and departments: a searchable employee directory, create, edit, and delete flows, CSV export, and dashboard metrics. A System Status page shows which EC2 instance and Availability Zone served each request, along with live health and readiness checks.",
        },
        {
          type: "paragraph",
          text: "The application is intentionally simple, with Node.js and vanilla JavaScript and no build step. The focus is the infrastructure around it and the application-level decisions that make a multi-AZ deployment work in practice.",
        },
      ],
      problem: [
        {
          type: "table",
          columns: ["Objective", "How it is addressed"],
          rows: [
            ["High availability", "Application instances in two Availability Zones behind an ALB; Aurora writer and reader in a Multi-AZ cluster"],
            ["Fault tolerance", "The Auto Scaling group replaces failed instances. Aurora fails over to the reader, and the app reconnects through the cluster writer endpoint"],
            ["Security", "Private subnets for compute and database, chained security groups, Secrets Manager with an IAM role, no SSH"],
            ["Scalability", "Stateless application tier, so instances can be added or removed at any time"],
            ["Operability", "Separate `/health` and `/ready` endpoints, structured JSON logs, a systemd service, and a scripted installation"],
          ],
        },
      ],
      architecture: [
        {
          type: "paragraph",
          text: "The deployment runs in eu-central-1 (Frankfurt). Public subnets host only the ALB and the NAT gateways. EC2 instances and Aurora run in private subnets with no public IP addresses.",
        },
        { type: "heading", text: "Traffic flow" },
        {
          type: "list",
          ordered: true,
          items: [
            "Inbound: user → Internet Gateway → ALB (HTTP :80) → a healthy target in the target group (HTTP :3000).",
            "Database: EC2 → Aurora cluster writer endpoint on TCP 3306, inside the VPC.",
            "Outbound: EC2 → the NAT gateway in the same zone → Internet Gateway, used for package installation, the Secrets Manager API, and the SSM agent.",
          ],
        },
        { type: "heading", text: "Subnets and routing" },
        {
          type: "table",
          columns: ["Subnet", "Zone", "CIDR", "Default route", "Hosts"],
          rows: [
            ["pd-public-1a", "eu-central-1a", "10.0.11.0/24", "Internet Gateway", "ALB node, NAT gateway A"],
            ["pd-public-1b", "eu-central-1b", "10.0.12.0/24", "Internet Gateway", "ALB node, NAT gateway B"],
            ["pd-private-1a", "eu-central-1a", "10.0.31.0/24", "NAT gateway A", "EC2 instance, Aurora instance"],
            ["pd-private-1b", "eu-central-1b", "10.0.32.0/24", "NAT gateway B", "EC2 instance, Aurora instance"],
          ],
        },
      ],
      implementation: [
        {
          type: "paragraph",
          text: "A single Node.js process per instance serves both the static frontend and the REST API on port 3000. There is no server-side session state, so any instance can handle any request and the ALB can balance without sticky sessions. The frontend only uses relative URLs, so it works behind any ALB DNS name without configuration.",
        },
        {
          type: "paragraph",
          text: "At startup the backend reads database credentials from Secrets Manager with the AWS SDK v3, which takes temporary credentials from the EC2 instance profile. The configuration file on the instance holds only the secret name and region.",
        },
        {
          type: "code",
          language: "text",
          caption: "Backend layout",
          code: `backend/
├── server.js          HTTP server, keep-alive tuning, graceful shutdown
└── src/
    ├── app.js         request context → health → security headers → /api → static
    ├── config/        environment configuration and Secrets Manager loader
    ├── controllers/   HTTP concerns (status codes, CSV export)
    ├── services/      business logic and parameterized SQL
    ├── db/pool.js     connection pool, retries, failover handling
    └── middleware/    request ID, access log, central error handler`,
        },
      ],
      decisions: [
        { type: "heading", text: "One NAT gateway and route table per Availability Zone" },
        {
          type: "paragraph",
          text: "A route table can have only one `0.0.0.0/0` target. With a single shared private route table, both zones would depend on one NAT gateway, and losing that zone would cut outbound access for the healthy one too.",
        },
        { type: "heading", text: "Health checks that do not depend on the database" },
        {
          type: "paragraph",
          text: "The ALB health check calls `/health`, which never touches Aurora. If it did, a short database failover would fail every instance's health check at once and leave the ALB with no healthy targets. Database reachability is reported separately by `/ready`.",
        },
        { type: "heading", text: "Cluster writer endpoint, not instance endpoints" },
        {
          type: "paragraph",
          text: "Instance endpoints are tied to a physical instance, not a role. After failover the original writer became a reader, so the application connects through the cluster endpoint, which Aurora repoints to the new writer.",
        },
        { type: "heading", text: "Safe retries during failover" },
        {
          type: "paragraph",
          text: "Broken and read-only connections are destroyed instead of being returned to the pool. Connection errors are retried with exponential backoff, but mid-query errors are retried only for idempotent reads, because a write that lost its connection may already have committed. When retries run out, the API returns `503` with `Retry-After`.",
        },
      ],
      testing: [
        {
          type: "paragraph",
          text: "Failure scenarios were tested manually in the deployed environment, and the repository separates what was observed in screenshots from what is only expected.",
        },
        {
          type: "table",
          columns: ["Test", "Procedure", "Observed result"],
          rows: [
            ["EC2 instance failure", "Stopped the instance in eu-central-1a from the console", "The target group removed it, the app stayed reachable through eu-central-1b, and the Auto Scaling group launched a replacement that rejoined the target group"],
            ["Aurora failover", "Started a manual failover on the cluster", "Writer and reader roles swapped without any application configuration change"],
            ["Recovery after failover", "Opened the System Status page through the ALB", "`/health` and `/ready` returned 200, with Aurora reachable as writer and both instances answering"],
          ],
        },
        {
          type: "paragraph",
          text: "Not measured: the exact time to replacement, and whether individual requests failed during either transition. The write-up therefore does not claim zero downtime. There is no automated test suite yet.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Checking load-balancer distribution",
          code: `for i in $(seq 1 20); do
  curl -s -D - -o /dev/null http://$ALB/health | grep -i x-served-by
done | sort | uniq -c`,
        },
      ],
      security: [
        {
          type: "list",
          items: [
            "Security groups form a chain: internet → ALB (80) → app (3000) → Aurora (3306), using security group references instead of IP ranges so rules survive instance replacement.",
            "No credentials in the repository, AMIs, or user data. The database password lives in Secrets Manager, read through an IAM role scoped to that secret.",
            "No key pair and no inbound port 22. Shell access goes through Session Manager over an outbound connection.",
            "The application database user only has `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, and connections to Aurora use TLS.",
            "Helmet security headers, a Content Security Policy, strict input validation, and parameterized SQL.",
          ],
        },
        {
          type: "paragraph",
          text: "Known gaps for a lab environment: the ALB serves HTTP only, the application has no user authentication, and the database password is not rotated yet.",
        },
      ],
      lessons: [
        {
          type: "list",
          items: [
            "Multi-AZ means every layer, including the network. Two instances do not give high availability if both private subnets route through one NAT gateway.",
            "Health checks must match what the load balancer can fix.",
            "Role is not identity in Aurora. Runbooks should not assume an instance's role from its name.",
            "Failover is an application concern too: discard dead connections, re-resolve DNS, and retry only what is safe to retry.",
            "User data runs only on first boot. When bootstrapping failed because of a missing outbound route, the fix was to repair the network and let the Auto Scaling group launch fresh instances.",
            "Some settings are fixed at creation. An Aurora cluster cannot be moved to another VPC, so checking the VPC and subnet group before creating it saves a rebuild.",
          ],
        },
      ],
      future: [
        {
          type: "list",
          items: [
            "Infrastructure as Code with Terraform for the whole environment.",
            "HTTPS with an ACM certificate, an HTTP to HTTPS redirect, and AWS WAF.",
            "CloudWatch logs, alarms, and a dashboard.",
            "RDS Proxy and read/write splitting to the reader endpoint.",
            "A CI/CD pipeline with automated tests and rolling deployments.",
            "VPC interface endpoints for Secrets Manager and SSM, plus secret rotation.",
          ],
        },
      ],
    },
  },
  {
    slug: "terraform-learning-log",
    title: "Terraform Learning Log",
    summary:
      "A working notebook of small Terraform configurations against AWS, from a first resource to modules, dynamic blocks, environment-specific variables, and a remote S3 backend.",
    kind: "Learning log",
    tags: ["Terraform", "HCL", "AWS", "EC2", "IAM", "Infrastructure as Code"],
    repositoryUrl: "https://github.com/ayberkgerey/terraform_cheatcodes",
    stack: [
      { name: "Terraform", purpose: "Infrastructure definitions, plans, and applies" },
      { name: "AWS provider", purpose: "Resources in eu-central-1: VPC, EC2, Elastic IP, security groups, IAM, and RDS" },
      { name: "Amazon S3", purpose: "Remote state backend experiment" },
    ],
    sections: {
      overview: [
        {
          type: "paragraph",
          text: "Each folder in the repository isolates one Terraform concept with a minimal configuration, so it can be planned, applied, and destroyed on its own. It is a learning reference, not a production module library.",
        },
      ],
      implementation: [
        {
          type: "table",
          columns: ["Topic", "What it covers"],
          rows: [
            ["first-resource, ec2, eip", "Provider setup, a first resource, and attaching an Elastic IP"],
            ["variables, vars", "Typed variables and environment-specific `.tfvars` files for test and prod"],
            ["count-demo, count-advc", "Creating several resources from one block with `count`"],
            ["dep", "Explicit `depends_on` ordering and looking up existing instances with a data source"],
            ["dynamic, sg", "Generating security group rules with `dynamic` blocks"],
            ["modules", "Extracting resources into a module and reading its outputs"],
            ["iam, rds", "IAM users and custom policies, and a first RDS instance"],
            ["import", "Bringing existing infrastructure under Terraform management"],
            ["backend", "Storing state remotely in S3"],
            ["challange1–3", "Exercises that combine the topics above, ending with separate web and database modules"],
          ],
        },
        {
          type: "code",
          language: "hcl",
          caption: "dynamic/main.tf: one ingress rule per port in a variable",
          code: `variable "ingressrules" {
  type    = list(number)
  default = [80, 443]
}

resource "aws_security_group" "webtraffic" {
  name = "Allow HTTPS"

  dynamic "ingress" {
    iterator = port
    for_each = var.ingressrules
    content {
      from_port   = port.value
      to_port     = port.value
      protocol    = "TCP"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}`,
        },
      ],
    },
  },
];
