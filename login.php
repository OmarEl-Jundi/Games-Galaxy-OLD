<?php
$error = ''; // Variable To Store Error Message
if (isset($_POST['submit'])) {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        $error = "Username or Password empty";
    } else {
        $username = $_POST['username'];
        $password = $_POST['password'];

        require 'connection.php';
        $q = "select * from `User` where (username='" . $username . "' OR email='" . $username . "') AND password='" . $password . "'";
        $result = mysqli_query($con, $q);
        if ($result === false) {
            die("Error executing the query: " . mysqli_error($con));
        } else {
            $res = mysqli_num_rows($result);
        }
        if ($res == 1) { //the sign in is successful, matching is correct

            $row = mysqli_fetch_array($result);

            session_start();

            session_regenerate_id();

            $_SESSION["user_id"] = $row['id'];
            $_SESSION["user_role"] = $row['role'];

            header("location: index.php");
            exit();

        } else { //matching is not correct
            $error = "Username or Password is invalid";
        }
        mysqli_close($con); // Closing Connection
    }
}
?>
<html>
<head>
    <title>Login</title>
    <link href="style2.css" rel="stylesheet" type="text/css">
    <link href="style.css" rel="stylesheet" type="text/css">
    <link
            rel="stylesheet"
            href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
    />
</head>
<header>
    <div class="nav container">
        <div class="logo">
            <img id="logo-img" src="uploads/Logo.png" alt=""/>
            <a href="#" class="">Games Galaxy</a>
            <?php
if (isset($user)) {
    if ($user['role'] == 1) {
        echo '<a href="admin-home.php">Admin Panel</a>';
        echo '<a href="library.php">Library</a>';
    } elseif ($user['role'] == 2) {
        echo '<a href="library.php">Library</a>';
    }
}
?>
        </div>
        <div class="icons">
            <?php
if (isset($user)) {
    echo '<a href="logout.php" id="contact">Log Out</a>';
} else {
    echo '<a href="login.php" id="contact">Log in</a>';
    echo '<a class="dash">-</a>';
    echo '<a href="signup.php" id="contact">Sign Up</a>';
}
?>
        </div>
    </div>
</header>
<body>
<div id="main">
    <h1>Login to Games Galaxy</h1>
    <div id="login">
        <h2>Login Form</h2>

        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
            <p><label>Enter your username or email:</label></p>
            <input id="name" name="username" placeholder="username OR email" type="text">
            <p><label>Enter your password :</label></p>
            <input id="password" name="password" placeholder="**********" type="password">
            <input name="submit" type="submit" value=" Login ">
            <span><?php echo $error; ?></span>
            <p><A id="signupbtn" Href="signup.php" align="center"> Sign up </A></p>
        </form>
        <div id="login-bottom" align=center>
            <a href="index.php">Go Back</a>
        </div>
    </div>
</div>
</body>
</html>