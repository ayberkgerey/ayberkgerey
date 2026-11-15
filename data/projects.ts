import type { Project } from "@/types/content";
import peopledeskArchitecture from "@/public/images/projects/peopledesk-architecture.png";
import sipBuckets from "@/public/images/projects/sip-buckets.png";
import sipResults from "@/public/images/projects/sip-results.png";

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
    featured: true,
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
