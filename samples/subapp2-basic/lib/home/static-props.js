"use strict";

exports.__esModule = true;
exports.getStaticProps = getStaticProps;
const maxDelay = 50;

async function getStaticProps() {
  const delay = Math.floor(Math.random() * maxDelay);
  return new Promise(resolve => {
    return setTimeout(() => resolve({
      props: {
        message: "Hello from static props",
        delay
      }
    }), delay);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXhEZWxheSIsImdldFN0YXRpY1Byb3BzIiwiZGVsYXkiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJwcm9wcyIsIm1lc3NhZ2UiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9zdGF0aWMtcHJvcHMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1heERlbGF5ID0gNTA7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcygpIHtcbiAgY29uc3QgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhEZWxheSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KFxuICAgICAgKCkgPT4gcmVzb2x2ZSh7IHByb3BzOiB7IG1lc3NhZ2U6IFwiSGVsbG8gZnJvbSBzdGF0aWMgcHJvcHNcIiwgZGVsYXkgfSB9KSxcbiAgICAgIGRlbGF5XG4gICAgKTtcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxRQUFRLEdBQUcsRUFBakI7O0FBRU8sZUFBZUMsY0FBZixHQUFnQztFQUNyQyxNQUFNQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JMLFFBQTNCLENBQWQ7RUFDQSxPQUFPLElBQUlNLE9BQUosQ0FBYUMsT0FBRCxJQUFhO0lBQzlCLE9BQU9DLFVBQVUsQ0FDZixNQUFNRCxPQUFPLENBQUM7TUFBRUUsS0FBSyxFQUFFO1FBQUVDLE9BQU8sRUFBRSx5QkFBWDtRQUFzQ1I7TUFBdEM7SUFBVCxDQUFELENBREUsRUFFZkEsS0FGZSxDQUFqQjtFQUlELENBTE0sQ0FBUDtBQU1EIn0=