<html>

<head>
    <link rel="stylesheet" href="style2.css">
    <link rel="stylesheet" href="adminstyle.css">
</head>
<?php
require 'connection.php';
session_start();
if ($_SESSION["user_role"] != 1) {
    header("location: index.php");
}
?>
<h1>Delete Game</h1>
<form method="post" action="">
    <p>
        <?php
        $result = mysqli_query($con, "SELECT * FROM Games");
        echo "<select name='game'>";
        while ($row = mysqli_fetch_array($result)) {
            echo "<option value=" . $row['id'] . ">" . $row['name'] . "</option>";
        }
        echo '</select>';
        mysqli_close($con);
        ?>
    </p>
    <input type="submit" value="Delete Game">
</form>

<?php
require 'connection.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['game'];
    $query = "DELETE FROM `Games` WHERE id = " . $id;
    $res = mysqli_query($con, $query);
    echo "Delete Successful";
}
?>
<p><a href="list-games.php">Show all Games</a></p>
<p><a href="admin-home.php">Go Back to Main Menu</a></p>