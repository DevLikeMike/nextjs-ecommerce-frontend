# TODO List

### Nextjs frontend linked to strapi for auth and ease of access to users

### Use stripe -> Orders, Products, User past transactions

[X] Set Up theme (primary #815fc0, secondary #333, use TNpearl for theme skeleton)
[X] Link Strapi to frontend
[X] Set up Layout for \_app
[X] Set up header (primary color with #333 text, #fff while hover) and navigation
[X] Set Up Auth form (primary color)
[X] Establish design for homepage (figma)

### Backend

[X] Register a user
[X] Login as a user
[X] Logout

#### All routes for auth in postman

### 2/15 Frontend day

[X] Add hero section to index page
[X] Build items component / items container
[X] Have functional link on item component to redirect to item page
[X] Add item to index page
[X] Build Item page
[X] Style item page

### 2/22

[X] Success page with useEffect to confirm payment success and update the order to paid
[X] Working order fetch and confirmation on success page
[X] Update the backend to change the order information and redirect to success page
[X] STRAPI migration from v3 to v4

### 3/1 User Page

[X] Create user dashboard
[X] Display all user orders (from stripe via payment intent?)

- http://localhost:1337/api/orders?filters[userID][$eq]=2&populate=\*
  [x] Create single order page
  [] Allow user to cancel order
