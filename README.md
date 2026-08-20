# Kisan Sahay

KISAN CONNECT — SMART INDIA HACKATHON 2026

Build a real, functional, deployable web application called:

Kisan Connect

जोड़ें किसान, बढ़े हिंदुस्तान

Problem Statement: S12 — Integrated Rural Resource-Exchange Platform

This application is being developed as a working prototype for Smart India Hackathon 2026 internal evaluation.

🚨 NON-NEGOTIABLE REQUIREMENTS

This must NOT be a static UI, design mockup, or collection of fake screens.

The application must contain real working functionality and real database persistence.

Do NOT create:

fake buttons

fake loading screens

fake success messages

hard-coded booking confirmations

fake database operations

navigation buttons that lead nowhere

features that appear functional but do nothing

Every core action must either:

actually work, or

clearly show that the feature is a planned integration and must NOT pretend to be implemented.

The most important goal is:

A judge should be able to open the deployed prototype and independently test the main workflow.

1. CORE PRODUCT IDEA

Kisan Connect is a farmer-centric platform that enables farmers to:

discover underused agricultural machinery

lend/rent machinery to nearby farmers

find resources based on location, availability and price

book machinery

exchange crop residues

communicate with other farmers

use voice-first interaction in regional languages

discover smart recommendations

build trust through verified profiles, ratings and reviews

The product should feel like:

A digital resource-sharing network built specifically for rural farmers.

It should NOT look like a generic e-commerce website or generic AI dashboard.

2. PRIMARY SIH DEMO WORKFLOW

This is the most important workflow in the entire application.

Build this completely before implementing secondary features.

Farmer journey:

Login

↓

Farmer Dashboard

↓

Find Machinery

↓

Search for Tractor

↓

Filter by location / price / availability

↓

Smart Match recommends the best option

↓

Open Machinery Details

↓

Check Availability Calendar

↓

Select dates

↓

Book Machinery

↓

Booking saved to Supabase

↓

Availability is updated

↓

Booking appears in My Bookings

This must work end-to-end.

3. SECONDARY WOW DEMO

Build a voice-first search experience.

Example:

🎤 “Mujhe do din ke liye tractor chahiye.”

The system should:

Voice → Text → Requirement extraction → Search → Recommendations

Extract:

Resource = Tractor

Duration = 2 days

Location = user's location, if available

Then display suitable machinery.

If Bhashini is not configured yet, use browser speech recognition as a clearly identified prototype fallback.

Never falsely claim that Bhashini is being used if it is not actually connected.

4. TECHNOLOGY STACK

Use:

Frontend

React

TypeScript

Tailwind CSS

Responsive design

PWA-friendly architecture

Backend / Data

Supabase

PostgreSQL

Supabase Auth

Supabase Storage

Supabase Edge Functions where server-side logic or external APIs are required

External integrations

Structure the application so these can be integrated securely:

Bhashini — regional speech-to-text

Maps / OpenStreetMap — location and distance

eNAM / Agmarknet — mandi/market data

Do not expose API secrets in frontend code.

Do NOT create a separate React Native application for this prototype. A responsive web/PWA-style application is sufficient.

5. DATABASE-FIRST IMPLEMENTATION

Create the Supabase database structure before building complex frontend interactions.

Create appropriate tables:

profiles

id

name

phone

email

village

district

state

preferred_language

farmer_type

profile_image

is_verified

rating

created_at

machinery

id

owner_id

name

category

brand

model

description

price_per_day

state

district

village

latitude

longitude

image_url

available_from

available_until

rating

is_verified

created_at

bookings

id

machinery_id

renter_id

owner_id

start_date

end_date

total_price

status

created_at

reviews

id

booking_id

reviewer_id

reviewed_user_id

machinery_id

rating

comment

created_at

crop_residues

id

owner_id

residue_type

quantity

unit

price

description

state

district

village

image_url

available

created_at

residue_requests

id

residue_id

requester_id

quantity

status

created_at

community_posts

id

author_id

title

content

category

created_at

community_comments

id

post_id

author_id

content

created_at

notifications

id

user_id

type

title

message

is_read

created_at

Use proper foreign-key relationships.

Implement Row Level Security.

Users must only be able to modify their own profile, listings and relevant records.

6. AUTHENTICATION

Create real Supabase authentication.

Pages:

Landing Page

Kisan Connect branding

Short explanation

“Get Started”

“Login”

Login

Email

Password

Sign Up

Name

Email

Password

Farmer Profile Setup

Name

Village

District

State

Preferred language

Farmer type

Optional profile image

After login:

→ Farmer Dashboard

Protect authenticated routes.

7. VISUAL DESIGN

The design should communicate:

Trust + Agriculture + Technology

Use:

deep agricultural greens

warm cream/white backgrounds

subtle earthy accents

clean typography

large accessible buttons

rounded cards

subtle shadows

clean icons

professional spacing

high contrast

mobile responsiveness

Do NOT overuse gradients.

Do NOT make it look like an AI-generated template.

Do NOT use excessive animations.

Use subtle transitions only where useful.

The application should feel like a real startup/product prototype, not a college assignment.

8. FARMER DASHBOARD

After login show:

“Namaste, [Farmer Name] 👋”

Display:

Current location

Profile verification status

Rating

Main actions

🚜 Find Machinery
➕ List Machinery
🌾 Crop Residues
👥 Community
📅 My Bookings
📦 My Listings

Dashboard statistics

Active bookings

Machinery listed

Residue listings

Requests received

Prominent voice button

🎤 “बोलिए, आपको क्या चाहिए?”

Also provide a text search field.

9. MACHINERY MARKETPLACE — PRIMARY MODULE

This is the hero feature.

Create:

Search bar

Example:

Search tractor, harvester, rotavator...

Filters

Category

Location

Price

Availability

Rating

Sorting

Best Match

Nearest

Lowest Price

Highest Rated

Categories:

Tractor

Harvester

Rotavator

Seed Drill

Cultivator

Thresher

Sprayer

Other

10. MACHINERY CARD

Each card should display:

Machinery image

Name

Brand/model

Owner

Verified badge

⭐ Rating

Price/day

Location

Distance

Availability

“View Details”

Example:

Mahindra Tractor

⭐ 4.8
₹800/day
📍 Jaipur
📏 3.2 km away
✓ Verified Farmer

11. LIST MACHINERY

Create a functional form:

Machinery name

Category

Brand

Model

Description

Price per day

State

District

Village

Available from

Available until

Image

Additional terms

On submission:

Validate → Save to Supabase → Show success → Redirect to listing

The newly created machinery must immediately appear in the marketplace.

Do NOT use hard-coded listings as the main data source.

Seed realistic demo data only to populate the initial marketplace.

12. MACHINERY DETAILS

Create a professional details page.

Show:

Large image

Machinery name

Owner

Verified badge

Rating

Reviews

Price

Location

Distance

Description

Terms

Availability calendar

Primary CTA:

Book This Machinery

13. REAL AVAILABILITY SYSTEM

This is critical.

The availability calendar must check existing bookings from Supabase.

When a user selects:

Start Date → End Date

check whether another confirmed/pending booking overlaps.

Do NOT allow overlapping bookings.

If unavailable:

❌ This machinery is already booked for these dates.

If available:

✓ Available for your selected dates.

14. REAL BOOKING SYSTEM

When user clicks:

Confirm Booking

Perform:

Validate dates.

Check availability again.

Calculate total price.

Insert booking into Supabase.

Create notification.

Update relevant availability state.

Show booking confirmation.

Display booking in My Bookings.

Booking statuses:

Pending

Confirmed

Completed

Cancelled

Create a professional booking confirmation screen.

15. MY BOOKINGS

Display:

Machinery

Owner

Dates

Price

Location

Status

Allow:

View booking

Cancel booking where appropriate

Create clear status badges.

16. SMART MATCHING ENGINE

Implement a real deterministic recommendation engine.

Do NOT pretend this is advanced machine learning.

Use weighted scoring:

Resource type — 30%

Availability — 25%

Location — 20%

Price — 15%

Rating — 10%

Normalize values and calculate a match score.

Example:

⭐ 94% Best Match

Mahindra Tractor

Why recommended:

✓ Matches requested resource
✓ Available for your dates
✓ 3.2 km away
✓ Good price
✓ Highly rated owner

Display the match score transparently.

17. VOICE-FIRST SEARCH

Create a large microphone interface.

UI:

🎤 Tap to Speak

After recording show:

You said:

“Mujhe do din ke liye tractor chahiye.”

Then:

Requirement detected

Resource: Tractor
Duration: 2 days

Then:

Recommended for you

Show the smart-matched machinery cards.

Support Hindi and English UI.

Structure the code so Bhashini can later be connected through a Supabase Edge Function.

If Bhashini is unavailable:

Use browser speech recognition where supported.

Clearly label this as:

Prototype Voice Recognition

Never fabricate an API response.

18. CROP RESIDUE EXCHANGE

Create a second resource marketplace.

Supported resources:

Wheat Straw

Rice Husk

Stubble

Mustard Residue

Organic Residue

Other

Farmers can:

List Residue

Fields:

Type

Quantity

Unit

Price

Location

Description

Image

Availability

Other farmers can:

Request Resource

Save the request to Supabase.

Display:

Seller

Quantity

Price

Location

Rating

Availability

19. COMMUNITY

Create a simple functional farmer community.

Features:

Create post

View posts

Comment

Like/helpful

Category

Example categories:

Machinery

Crops

Prices

Government Schemes

Farming Advice

Keep this secondary to the machinery workflow.

20. FARMER TRUST SYSTEM

Profiles should show:

Verified Farmer

⭐ Rating

Number of completed rentals

Reviews

Machinery listed

Joined date

After a completed booking, allow the renter to leave a review.

Use reviews to calculate/display ratings.

21. LOCATION

Store:

State

District

Village/city

Latitude

Longitude

If map API is available, display location.

If not, show location text and calculate approximate distance using available coordinates.

Do NOT let missing Maps API credentials break the application.

22. NOTIFICATIONS

Create in-app notifications for:

Booking request

Booking confirmation

Booking cancellation

Resource request

Review received

Show unread notification count.

Email/SMS is NOT required for the MVP.

23. SAMPLE DATA

Seed realistic demo data.

Machinery:

Mahindra 575 DI Tractor — Jaipur

Swaraj 744 FE Tractor — Jaipur

John Deere 5310 — Sanganer

Combine Harvester — Ajmer

Rotavator — Jaipur

Crop residues:

Wheat Straw — 500 kg

Rice Husk — 300 kg

Mustard Residue — 200 kg

Create different prices, ratings, locations and availability dates so filtering and matching can actually be demonstrated.

24. ERROR / LOADING STATES

Every database operation must have:

Loading state

Empty state

Success state

Error state

Use toast notifications where appropriate.

Never show success unless the database operation actually succeeds.

Never silently swallow errors.

25. RESPONSIVE DESIGN

The deployed application must work on:

Laptop

Tablet

Mobile browser

Prioritize mobile usability because the target users are farmers using smartphones.

Buttons must be large enough to tap.

Forms must be simple.

Avoid dense tables where cards would be easier.

26. SECURITY

Never expose:

service-role keys

private API keys

external API secrets

Use Supabase Row Level Security.

Use Edge Functions for secret-dependent external API calls.

Validate all user inputs.

27. DEPLOYMENT

The final application must be deployable and accessible through a public URL.

Before considering the prototype complete:

Test the public URL.

Test:

Signup

Login

Dashboard

Create machinery

Search machinery

Filters

Machinery details

Availability

Booking

My bookings

Voice search

Crop residue listing

Resource request

Community post

Do not declare the project complete until the primary workflow works from the deployed URL.

28. DEMO-FIRST DEVELOPMENT

Build the application in this order.

PHASE 1 — FOUNDATION

Project setup

Supabase connection

Database schema

Authentication

Protected routes

PHASE 2 — HERO FEATURE

Dashboard

Machinery marketplace

Listing machinery

Search/filter

Details

Availability

Booking

My Bookings

PHASE 3 — INTELLIGENCE

Smart matching

Voice search

PHASE 4 — SECONDARY FEATURES

Crop residue exchange

Community

Notifications

Reviews

PHASE 5 — POLISH

Responsive design

Accessibility

Error states

Loading states

UX improvements

PHASE 6 — DEPLOYMENT

Production build

Test public URL

Fix errors

Final demo verification

29. FINAL DEMO SCENARIO

The application should support this exact demonstration:

Step 1

Farmer logs in.

Step 2

Dashboard shows:

Namaste, Ramesh 👋
📍 Jaipur

Step 3

Farmer clicks:

Find Machinery

Step 4

Search:

Tractor

Step 5

Apply:

Available + Nearby

Step 6

System displays:

⭐ Best Match

Mahindra Tractor
4.8 ⭐
₹800/day
3.2 km away

Step 7

Open details.

Step 8

Select dates.

Step 9

Book.

Step 10

Booking is actually saved.

Step 11

Open My Bookings.

Step 12

Demonstrate:

🎤 “Mujhe do din ke liye tractor chahiye.”

Step 13

Show:

Speech → Requirement → Smart Match

Step 14

Briefly demonstrate:

🌾 Crop Residue Exchange

30. IMPORTANT DEVELOPMENT RULE

If a feature cannot be completed reliably, DO NOT spend excessive time making its UI beautiful.

A smaller number of genuinely functional features is more valuable than many fake features.

Priority:

MUST WORK

Authentication

Database

Machinery marketplace

Machinery listing

Search/filter

Availability

Booking

My Bookings

HIGH PRIORITY

Smart Matching

Voice Search

SECONDARY

Crop Residue

Community

Notifications

Reviews

Admin

31. FINAL PRODUCT STANDARD

The final result should feel like:

A real early-stage rural technology product that could be tested with farmers.

It should NOT feel like:

“an AI-generated college project.”

Focus on:

Functionality + usability + trust + accessibility + rural relevance.

Do not add unnecessary features just to make the application look bigger.

START NOW

Do NOT attempt to generate all complex functionality blindly in one pass.

First:

Create the project structure.

Create the Supabase schema.

Connect authentication.

Create protected routes.

Build the dashboard.

Build the machinery marketplace.

Build listing + search + availability + booking.

Verify the complete booking workflow.

Only then implement smart matching and voice search.

Then implement crop residue and community.

At every stage, prioritize working functionality over visual complexity.

The first milestone is:

LOGIN → DASHBOARD → FIND MACHINERY → SEARCH → BEST MATCH → AVAILABILITY → BOOK → MY BOOKINGS

Once that entire flow works with real Supabase data, continue to the next module.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://krishi-link-farm.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/63842a29-ecd6-47c2-b88e-9342f33f981e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
