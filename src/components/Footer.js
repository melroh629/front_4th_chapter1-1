export const Footer = () => {
  const template = `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;

  const init = () => {
    console.log("Footer init");
  };

  return { template, init };
};
