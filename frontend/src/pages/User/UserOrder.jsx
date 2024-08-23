import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import Navigation from "../Auth/Navigation";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">IMAGE</th>
                    <th className="py-2">ID</th>
                    <th className="py-2">DATE</th>
                    <th className="py-2">TOTAL</th>
                    <th className="py-2">PAID</th>
                    <th className="py-2">DELIVERED</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-2">
                        <img
                          src={order.orderItems[0].image}
                          alt={order.user}
                          className="w-[6rem] mb-5"
                        />
                      </td>
                      <td className="py-2">{order._id}</td>
                      <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                      <td className="py-2">₹ {order.totalPrice}</td>
                      <td className="py-2">
                        {order.isPaid ? (
                          <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                            Pending
                          </p>
                        )}
                      </td>
                      <td className="py-2">
                        {order.isDelivered ? (
                          <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                            Pending
                          </p>
                        )}
                      </td>
                      <td className="py-2">
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-orange-400 text-black py-2 px-3 rounded">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-full sm:w-20 h-40 object-cover mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div>
                      <p className="text-gray-800">
                        <strong>ID:</strong> {order._id}
                      </p>
                      <p className="text-gray-800">
                        <strong>DATE:</strong> {order.createdAt.substring(0, 10)}
                      </p>
                      <p className="text-gray-800">
                        <strong>TOTAL:</strong> ₹ {order.totalPrice}
                      </p>
                      <p className="text-gray-800">
                        <strong>PAID:</strong>
                        {order.isPaid ? (
                          <span className="inline-block bg-green-400 text-white px-2 py-1 rounded-full ml-2">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-block bg-red-400 text-white px-2 py-1 rounded-full ml-2">
                            Pending
                          </span>
                        )}
                      </p>
                      <p className="text-gray-800">
                        <strong>DELIVERED:</strong>
                        {order.isDelivered ? (
                          <span className="inline-block bg-green-400 text-white px-2 py-1 rounded-full ml-2">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-block bg-red-400 text-white px-2 py-1 rounded-full ml-2">
                            Pending
                          </span>
                        )}
                      </p>
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-orange-400 text-black py-2 px-3 rounded mt-2">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserOrder;
